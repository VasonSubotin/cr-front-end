import React from "react";

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

export default MainPage;
