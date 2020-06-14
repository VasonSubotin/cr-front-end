import React from "react";

import { withAuth } from "components/hoc/withAuth";
import { AuthLayout } from "components/Layout";
import { CarsList } from "components/CarsList";

/**
 * Main page.
 */
const MainPage = () => (
  <AuthLayout>
    <CarsList />
  </AuthLayout>
);

export default withAuth(MainPage);
