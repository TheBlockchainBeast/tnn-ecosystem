import { NextRequest } from "next/server";

/**
 * Serves TonConnect manifest with `url` set to the request origin
 * so the manifest is valid for any deployment (localhost, Vercel, GitHub Pages).
 */
export async function GET(request: NextRequest) {
  const host = request.headers.get("host") ?? "localhost:3000";
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  const origin = `${protocol}://${host}`;

  const manifest = {
    url: origin,
    name: "The Nobody Network",
    iconUrl: "https://ton-connect.github.io/demo-dapp-with-react-ui/apple-touch-icon.png",
    termsOfUseUrl: "https://ton-connect.github.io/demo-dapp-with-react-ui/terms-of-use.txt",
    privacyPolicyUrl: "https://ton-connect.github.io/demo-dapp-with-react-ui/privacy-policy.txt",
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
