import { NextResponse } from "next/server";

const GNEWS_BASE_URL = "https://gnews.io/api/v4";
const ARTICLE_LIMIT = 25;

export const revalidate = 300;

const REVALIDATE_SECONDS = revalidate;

let lastSuccessfulArticles: NewsArticle[] = [];

interface GNewsSource {
  name?: string | null;
  url?: string | null;
}

interface GNewsArticle {
  title?: string | null;
  description?: string | null;
  content?: string | null;
  url?: string | null;
  image?: string | null;
  publishedAt?: string | null;
  source?: GNewsSource | null;
}

interface GNewsResponse {
  totalArticles?: number;
  articles?: GNewsArticle[];
}

interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  source: string;
  publishedAt: string;
  url: string;
}

type ValidGNewsArticle = GNewsArticle & {
  title: string;
  url: string;
  publishedAt: string;
  source: GNewsSource & { name: string };
};

type GNewsRequest =
  | {
    endpoint: "top-headlines";
    category: "technology" | "business" | "science" | "world" | "nation";
    max: number;
  }
  | {
    endpoint: "search";
    q: string;
    max: number;
  };

const requests: GNewsRequest[] = [
  { endpoint: "top-headlines", category: "technology", max: 8 },
  { endpoint: "top-headlines", category: "business", max: 6 },
  { endpoint: "top-headlines", category: "science", max: 5 },
  { endpoint: "top-headlines", category: "world", max: 5 },
  { endpoint: "top-headlines", category: "nation", max: 5 },
  { endpoint: "search", q: "artificial intelligence", max: 5 },
  { endpoint: "search", q: "gaming OR video games", max: 4 },
];

function buildGNewsUrl(request: GNewsRequest, apiKey: string): string {
  const url = new URL(`${GNEWS_BASE_URL}/${request.endpoint}`);

  url.searchParams.set("lang", "en");
  url.searchParams.set("country", "in");
  url.searchParams.set("max", request.max.toString());
  url.searchParams.set("apikey", apiKey);

  if (request.endpoint === "top-headlines") {
    url.searchParams.set("category", request.category);
  } else {
    url.searchParams.set("q", request.q);
  }

  return url.toString();
}

async function fetchGNews(request: GNewsRequest, apiKey: string) {
  const response = await fetch(buildGNewsUrl(request, apiKey), {
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });
  if (!response.ok) {
    const text = await response.text();

    console.error(
      "GNews Error:",
      response.status,
      request.endpoint,
      request.endpoint === "top-headlines" ? request.category : request.q,
      text
    );

    throw new Error(`GNews request failed: ${response.status}`);
  }

  return (await response.json()) as GNewsResponse;
}

function isValidArticle(article: GNewsArticle): article is ValidGNewsArticle {
  return Boolean(
    article.title?.trim() &&
    article.url?.trim() &&
    article.publishedAt?.trim() &&
    article.source?.name?.trim()
  );
}

function createStableId(url: string): string {
  let hash = 0;

  for (let i = 0; i < url.length; i++) {
    hash = (hash << 5) - hash + url.charCodeAt(i);
    hash |= 0;
  }

  return `news-${Math.abs(hash).toString(36)}`;
}

function normalizeArticle(article: ValidGNewsArticle): NewsArticle {
  return {
    id: createStableId(article.url),
    title: article.title.trim(),
    description: article.description?.trim() || null,
    image: article.image?.trim() || null,
    source: article.source.name.trim(),
    publishedAt: article.publishedAt,
    url: article.url,
  };
}

function selectBestArticles(responses: GNewsResponse[]): NewsArticle[] {
  const seenUrls = new Set<string>();

  return responses
    .flatMap((response) => response.articles ?? [])
    .filter(isValidArticle)
    .filter((article) => {
      const url = article.url.trim();

      if (seenUrls.has(url)) {
        return false;
      }

      seenUrls.add(url);
      return true;
    })
    .map(normalizeArticle)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, ARTICLE_LIMIT);
}

export async function GET() {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GNEWS_API_KEY is missing." },
      { status: 500 }
    );
  }

  try {
    const settled = await Promise.allSettled(
      requests.map((request) => fetchGNews(request, apiKey))
    );

    const responses = settled
      .filter(
        (result): result is PromiseFulfilledResult<GNewsResponse> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);

    const articles = selectBestArticles(responses);

    if (articles.length > 0) {
      lastSuccessfulArticles = articles;
      return NextResponse.json(articles);
    }

    if (lastSuccessfulArticles.length > 0) {
      return NextResponse.json(lastSuccessfulArticles);
    }

    return NextResponse.json(
      { error: "Unable to fetch news." },
      { status: 503 }
    );
  } catch {
    if (lastSuccessfulArticles.length > 0) {
      return NextResponse.json(lastSuccessfulArticles);
    }

    return NextResponse.json(
      { error: "Unable to fetch news." },
      { status: 503 }
    );
  }
}
