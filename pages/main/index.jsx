import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withAuth } from "components/hoc/withAuth";
import { AuthLayout } from "components/Layout";
import { CarsList } from "components/CarsList";
import { CarInfo } from "components/CarInfo";
import { Schedule } from "components/Schedule";
import { resourcesSelectors } from "modules/resources";

/**
 * Main page.
 */
const MainPage = ({ selectedResourceId, isShowSchedule }) => {
  const renderContent = () => {
    if (!selectedResourceId) {
      return <CarsList />;
    }
    if (selectedResourceId && isShowSchedule) {
      return <Schedule />;
    }

    return <CarInfo />;
  };

  return <AuthLayout>{renderContent()}</AuthLayout>;
};

const mapStateToProps = (state) => ({
  selectedResourceId: resourcesSelectors.getSelectedResourceId(state),
  isShowSchedule: resourcesSelectors.getIsShowSchedule(state),
});

export default compose(connect(mapStateToProps, null), withAuth)(MainPage);
