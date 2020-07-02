import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withAuthPage } from "components/hoc/withAuthPage";
import { AuthLayout } from "components/Layout";
import { CarsList } from "components/CarsList";
import { CarInfo } from "components/CarInfo";
import { Schedule } from "components/Schedule";
import { resourcesSelectors, resourcesActions } from "modules/resources";

/**
 * Main page.
 */
const MainPage = ({ selectedResourceId, setSelectedResource, hideSchedule, isShowSchedule }) => {
  let childComponent = null;
  let onBackClick = null;

  if (!selectedResourceId) {
    childComponent = <CarsList />;
    onBackClick = null;
  } else if (selectedResourceId && isShowSchedule) {
    childComponent = <Schedule />;
    onBackClick = hideSchedule;
  } else {
    childComponent = <CarInfo />;
    onBackClick = () => setSelectedResource(null);
  }

  return <AuthLayout onBackClick={onBackClick}>{childComponent}</AuthLayout>;
};

const mapStateToProps = (state) => ({
  selectedResourceId: resourcesSelectors.getSelectedResourceId(state),
  isShowSchedule: resourcesSelectors.getIsShowSchedule(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideSchedule: () => dispatch(resourcesActions.hideSchedule()),
  setSelectedResource: (resourceId) => dispatch(resourcesActions.setSelectedResource(resourceId)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthPage)(MainPage);
