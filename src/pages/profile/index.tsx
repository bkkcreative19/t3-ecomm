import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";

import styled from "styled-components";
import { Layout } from "../../features/ui/layout";
import { trpc } from "../../utils/trpc";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ProfileStyles = styled.div``;

const ProfilePage: NextPage = () => {
  const { data: orders } = trpc.order.getOrders.useQuery();

  const { data: session } = useSession();

  // if (!session) {
  //   signIn();
  // }

  const yay = orders && orders[0]?.createdAt;

  const date = new Date(yay!);

  return (
    <ProfileStyles>
      <Layout>
        <h1
          style={{ fontSize: "2rem", marginTop: "4rem", marginBottom: "3rem" }}
        >
          My Orders
        </h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: "1.2rem" }}>ID</TableCell>
                <TableCell style={{ fontSize: "1.2rem" }} align="center">
                  Date
                </TableCell>
                <TableCell style={{ fontSize: "1.2rem" }} align="right">
                  Total
                </TableCell>
                {/* <TableCell align="right"></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order: any) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ fontSize: "1.5rem" }}
                    component="th"
                    scope="row"
                  >
                    {order.id}
                  </TableCell>
                  <TableCell style={{ fontSize: "1.5rem" }} align="center">
                    {date.toDateString()}
                  </TableCell>
                  <TableCell style={{ fontSize: "1.5rem" }} align="right">
                    ${formatNumber(order.total).toFixed(2)}
                  </TableCell>
                  {/* <TableCell style={{ fontSize: "1.5rem" }} align="right">
                    <button>Details</button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </ProfileStyles>
  );
};

export default ProfilePage;

function formatNumber(num: any) {
  let newNum: any = num.toString();

  newNum = newNum.substring(0, newNum.length - 2);

  return Number(newNum);
}
