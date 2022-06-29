import React, { useEffect } from "react";
import { connect } from "react-redux";
import Head from "next/head";

import { APPLICATION_ROUTES, navigationIndexer } from "../../constants";
import { fetchEntity, switchNavigation } from "../../redux/actions";
import Main from "../../components/Account";
import styles from "./index.module.scss";

const dashboardCard = (title, data) => {
  return (
    <div className={styles["dashboard-card"]}>
      <div className={styles["card-container"]}>
        <div className={styles["card-title"]}>{title}</div>
        <div className={styles["card-show"]}>
          <div className={styles["card-stats"]}>{data > -1 ? data : "NA"}</div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = (props) => {
  const { dashboard, triggerFetchEntity, triggerSwitchNavigation } = props;

  useEffect(() => {
    triggerFetchEntity(APPLICATION_ROUTES.DASHBOARD);
    triggerSwitchNavigation(navigationIndexer.dashboard);
  }, []);

  return (
    <Main>
      <Head>
        <title>Dashboard</title>
      </Head>
      <section className={styles["dashboard-container"]}>
        <section className={styles.dashboard}>
          <div className="content-heading">Dashboard</div>
          <section className={styles["dashboard-stats"]}>
            {dashboardCard("Total users", dashboard.total)}
            {dashboardCard("Active users", dashboard.active)}
            {dashboardCard("Blocked users", dashboard.blocked)}
            {dashboardCard("Deleted users", dashboard.deleted)}
          </section>
        </section>
      </section>
    </Main>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerSwitchNavigation: (active) => dispatch(switchNavigation({ active })),
    triggerFetchEntity: (endpoint, payload) =>
      dispatch(fetchEntity({ endpoint, payload })),
  };
};

const mapStateToProps = (state) => {
  const { dashboard } = state;
  return { dashboard };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
