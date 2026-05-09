export async function POST(req) {
  const data = await req.json();

  console.log("Received:", data);

  return new Response(
    JSON.stringify({ message: "OK" }),
    { status: 200 }
  );
}
