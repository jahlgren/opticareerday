import withApiAuth from "@/modules/auth/api/with-api-auth";

const GET = withApiAuth([],
  async (request: Request) => {
    return Response.json({ message: 'Hello world' });
  }
)

export { GET };
