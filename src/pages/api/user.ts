import type { NextApiRequest, NextApiResponse } from "next";
// import { appRouter } from "../../../server/api/root";
// import { createTRPCContext } from "../../../server/api/trpc";

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  //   const ctx = await createTRPCContext({ req, res });
  //   const caller = appRouter.createCaller(ctx);
  try {
    console.log("hi");
    res.send("hi");
    // const { id } = req.query;
    // const user = await caller.user.getById(id);
    // res.status(200).json(user);
  } catch (cause) {
    //     if (cause instanceof TRPCError) {
    //       // An error from tRPC occured
    //       const httpCode = getHTTPStatusCodeFromError(cause);
    //       return res.status(httpCode).json(cause);
    //     }
    //     // Another error occured
    //     console.error(cause);
    //     res.status(500).json({ message: "Internal server error" });
  }
};

export default userHandler;
