import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withAuth } from "components/hoc/withAuth";
import { AuthLayout } from "components/Layout";
import { CarsList } from "components/CarsList";
import { Schedule } from "components/Schedule";
import { resourcesSelectors } from "modules/resources";

/**
 * Main page.
 */
const MainPage = ({ selectedResource, isShowSchedule }) => {
  const renderContent = () => {
    if (!selectedResource) {
      return <CarsList />;
    }
    if (selectedResource && isShowSchedule) {
      return <Schedule />;
    }

    return <CarsList />;
  };

  return <AuthLayout>{renderContent()}</AuthLayout>;
};

const mapStateToProps = (state) => ({
  selectedResource: resourcesSelectors.getSelectedResource(state),
  isShowSchedule: resourcesSelectors.getIsShowSchedule(state),
});

export default compose(connect(mapStateToProps, null), withAuth)(MainPage);
