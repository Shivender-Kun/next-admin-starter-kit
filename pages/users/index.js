import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import { toast, ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Image from "next/image";
import Head from "next/head";

import {
  switchNavigation,
  fetchEntity,
  genericApiHit,
  nullifyApiMessage,
} from "../../redux/actions";
import {
  navigationIndexer,
  APPLICATION_ROUTES,
  IMAGE_PREFIXES,
  ADMIN_USER_ACTIONS,
} from "../../constants";
// import LoadingOverlay from "../../components/LoadingOverlay";
import PlaceHolderIMG from "../../public/profile.png";
import Pagination from "../../components/Pagination";
import { SerialIdFunction } from "../../util/regFun";
import SearchBar from "../../components/SearchBar";
import Main from "../../components/Account";

const TableHeaders = () => {
  const tableHead = (heading) => <th>{heading}</th>;
  return (
    <tr className="head-tr">
      {tableHead("Sr no.")}
      {tableHead("Image")}
      {tableHead("Name")}
      {tableHead("Email")}
      {tableHead("Status")}
      {tableHead("Actions")}
    </tr>
  );
};

const TableRow = (user, index, userAction, page, limit) => {
  const imageLoader = (src) => {
    if (src.src != PlaceHolderIMG.src) {
      return `${IMAGE_PREFIXES.IMAGE_SMALL}${src.src}`;
    }
    return src.src;
  };

  return (
    <tr className="body-tr" key={user._id + index}>
      <td>{SerialIdFunction(limit * page - 10 + index + 1)}</td>
      <td>
        <Image
          loader={imageLoader}
          src={user.picture || PlaceHolderIMG}
          onError={(e) => {
            e.target.src = PlaceHolderIMG.src;
            e.target.srcset = PlaceHolderIMG.src;
          }}
          alt={user.name || "user"}
          width="78px"
          height="78px"
        />
      </td>
      <td>{user.name || "NA"}</td>
      <td>
        <a href={`mailto:${user.email}`}>{user.email || "NA"}</a>
      </td>
      <td>
        <button
          aria-label={`${user.blocked ? "unblock" : "block"} this customer?`}
          onClick={() =>
            confirm(
              `Are you sure you want to ${
                user.blocked ? "unblock" : "block"
              } this user?`
            ) &&
            userAction(
              user._id,
              user.blocked
                ? ADMIN_USER_ACTIONS.UNBLOCKED
                : ADMIN_USER_ACTIONS.BLOCKED
            )
          }
          className={user.blocked ? "block-button btn" : "delete-button btn"}
        >
          {user.blocked ? "Blocked" : "Block"}
        </button>
      </td>

      <td className="custom-td-remove">
        <button
          aria-label="delete user"
          onClick={() =>
            confirm("Are you sure you want to delete this customer?") &&
            userAction(user._id, ADMIN_USER_ACTIONS.DELETED)
          }
          className="delete-button btn"
        >
          <DeleteOutlineOutlinedIcon fontSize="small" />
          &nbsp;Delete
        </button>
      </td>
    </tr>
  );
};

const Users = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const {
    triggerNullifyApiMessage,
    triggerSwitchNavigation,
    triggerGenericApiHit,
    triggerFetchEntity,
    users: { list, page, size, total, limit },
    apiMessage,
  } = props;

  useEffect(() => {
    triggerFetchEntity(
      APPLICATION_ROUTES.USERS,
      {
        text: searchInput || "",
      },
      1,
      10
    );
    triggerSwitchNavigation(navigationIndexer.users);
  }, [searchInput, triggerFetchEntity, triggerSwitchNavigation]);

  const handlePaginationNext = () => {
    triggerFetchEntity(
      APPLICATION_ROUTES.USERS,
      {
        text: searchInput || "",
      },
      page + 1,
      limit
    );
    document.getElementsByClassName("table-subContainer")[0].scrollTo(0, 0);
  };

  const handlePaginationBack = () => {
    triggerFetchEntity(
      APPLICATION_ROUTES.USERS,
      {
        text: searchInput || "",
      },
      page - 1,
      limit
    );
    document.getElementsByClassName("table-subContainer")[0].scrollTo(0, 0);
  };

  const userAction = (userRef, action) => {
    triggerGenericApiHit(
      APPLICATION_ROUTES.EDIT_USER,
      {
        userRef,
        text: searchInput,
        action,
      },
      APPLICATION_ROUTES.USERS,
      page,
      limit
    );
    document.getElementsByClassName("table-subContainer")[0].scrollTo(0, 0);
  };

  // if (apiMessage.message) {
  //   toast.dismiss();
  //   if (apiMessage.code === 100) {
  //     toast.success(apiMessage.message);
  //   } else {
  //     toast.error(apiMessage.message);
  //   }
  //   triggerNullifyApiMessage();
  // }

  return (
    <Main>
      <Head>
        <title>Users</title>
      </Head>

      <section className="content">
        <section className="content-top">
          <div className="content-heading">Users</div>
          <div className="content-top-left contend-top-left-margin">
            <SearchBar
              setSearchInput={setSearchInput}
              searchInput={searchInput}
            />

            {list.length > 0 &&
              Pagination({
                page: page,
                limit: limit,
                total: total,
                length: size,
                nextHandler: handlePaginationNext,
                previousHandler: handlePaginationBack,
              })}
          </div>
        </section>
        <div className="table-container" style={{ marginTop: "40px" }}>
          <div className="table-subContainer">
            <table className="table">
              <thead className="table-head">{TableHeaders()}</thead>
              <tbody className="table-body">
                {list.length ? (
                  list.map((user, index) =>
                    TableRow(user, index, userAction, page, limit)
                  )
                ) : (
                  <tr>
                    <td className="emptyTable" colSpan="7">
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
    triggerGenericApiHit: (endpoint, payload, listingEndpoint, page, limit) =>
      dispatch(
        genericApiHit({ endpoint, payload, listingEndpoint, page, limit })
      ),
    triggerNullifyApiMessage: () => dispatch(nullifyApiMessage()),
  };
};

const mapStateToProps = (state) => {
  const { fetching, modalState, users, apiMessage, imgModalState } = state;
  return {
    fetching,
    modalState,
    users,
    apiMessage,
    imgModalState,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
