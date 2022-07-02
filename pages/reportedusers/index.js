import React, { useEffect } from "react";
import { connect } from "react-redux";
import Head from "next/head";

import { switchNavigation, fetchEntity } from "../../redux/actions";
import { navigationIndexer, APPLICATION_ROUTES } from "../../constants";
import Pagination from "../../components/Pagination";
import { SerialIdFunction } from "../../util/regFun";
import Main from "../../components/Account";

const UserTableHeaders = () => (
  <tr className="head-tr">
    <th>Sr no.</th>
    <th>Reported User</th>
    <th>Reported by</th>
    <th>Reason of report</th>
  </tr>
);

const UserRow = (user, index, page = 1, limit = 10) => (
  <tr className="body-tr" key={user._id + index}>
    <td>{SerialIdFunction(limit * page - limit + index + 1)}</td>
    <td>
      <div
        className="marginRight_table"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {user.reportedUser || "NA"}
        <a
          style={{
            margin: "5px 0",
            width: "fit-content",
          }}
          href={`mailto:${user.reportedUserEmail}`}
        >
          {user.reportedUserEmail || "NA"}
        </a>
      </div>
    </td>

    <td>
      <div
        className="marginRight_table"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {user.reportedBy || "NA"}
        <a
          style={{
            margin: "5px 0",
            width: "fit-content",
          }}
          href={`mailto:${user.reportedByEmail}`}
        >
          {user.reportedByEmail || "NA"}
        </a>
      </div>
    </td>
    <td>{user.reason || "NA"}</td>
  </tr>
);

const ReportedUsers = (props) => {
  const {
    reportedUsers: { page, limit, total, size, list },
    triggerSwitchNavigation,
    triggerFetchEntity,
  } = props;

  useEffect(() => {
    triggerFetchEntity(APPLICATION_ROUTES.REPORTED_USERS, {}, 1, 10);
    triggerSwitchNavigation(navigationIndexer.reportedusers);
  }, [triggerFetchEntity, triggerSwitchNavigation]);

  const handlePaginationNext = (e) => {
    triggerFetchEntity(APPLICATION_ROUTES.REPORTED_USERS, {}, page + 1, limit);
  };

  const handlePaginationBack = (e) => {
    triggerFetchEntity(APPLICATION_ROUTES.REPORTED_USERS, {}, page - 1, limit);
  };

  return (
    <Main>
      <Head>
        <title>Reported Users</title>
      </Head>
      <section className="content">
        <section className="content-top">
          <div className="content-heading">Reported Users</div>
          <div className="content-top-left contend-top-left-margin">
            {list.length
              ? Pagination({
                  page,
                  limit,
                  total,
                  length: size,
                  nextHandler: handlePaginationNext,
                  previousHandler: handlePaginationBack,
                })
              : null}
          </div>
        </section>
        <div className="table-container" style={{ marginTop: "40px" }}>
          <div className="table-subContainer">
            <table className="table">
              <thead className="table-head">{UserTableHeaders()}</thead>
              <tbody className="table-body">
                {list.length ? (
                  list.map((user, index) => UserRow(user, index, page, limit))
                ) : (
                  <tr>
                    <td className="emptyTable" colSpan="4">
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <section className="content-bottom"></section>
      </section>
    </Main>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerSwitchNavigation: (active) => dispatch(switchNavigation({ active })),
    triggerFetchEntity: (endpoint, payload, page, limit) =>
      dispatch(fetchEntity({ endpoint, payload, page, limit })),
  };
};

const mapStateToProps = (state) => {
  const { reportedUsers } = state;
  return { reportedUsers };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportedUsers);
