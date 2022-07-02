import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Head from "next/head";

import {
  switchNavigation,
  fetchEntity,
  genericApiHit,
  nullifyApiMessage,
} from "../../redux/actions";
import { navigationIndexer, APPLICATION_ROUTES } from "../../constants";
import Pagination from "../../components/Pagination";
import { SerialIdFunction } from "../../util/regFun";
import Main from "../../components/Account";

const TableHeaders = () => {
  const tableHead = (heading) => <th>{heading}</th>;
  return (
    <tr className="head-tr">
      {tableHead("Sr no.")}
      {tableHead("Created By")}
      {tableHead("Song Name")}
      {tableHead("Caption")}
      {tableHead("Activity")}
      {tableHead("Actions")}
    </tr>
  );
};

const TableRow = (post, index, deletePost, page, limit) => {
  return (
    <tr className="body-tr" key={post._id + index}>
      <td>{SerialIdFunction(limit * page - 10 + index + 1)}</td>
      <td>{post.firstName + " " + post.lastName || "NA"}</td>
      <td>{post.songName || "NA"}</td>
      <td>{post.caption || "NA"}</td>
      <td>{post.activity || "NA"}</td>

      <td className="custom-td-remove">
        <button
          aria-label="delete post"
          onClick={() =>
            confirm("Are you sure you want to delete this post?") &&
            deletePost(post._id)
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

const Posts = (props) => {
  const {
    triggerNullifyApiMessage,
    triggerSwitchNavigation,
    triggerGenericApiHit,
    triggerFetchEntity,
    posts: { list, page, size, total, limit },
    apiMessage,
  } = props;

  useEffect(() => {
    triggerFetchEntity(APPLICATION_ROUTES.POSTS, {}, 1, 10);
    triggerSwitchNavigation(navigationIndexer.posts);
  }, [triggerFetchEntity, triggerSwitchNavigation]);

  const handlePaginationNext = () => {
    triggerFetchEntity(APPLICATION_ROUTES.POSTS, {}, page + 1, limit);
    document.getElementsByClassName("table-subContainer")[0].scrollTo(0, 0);
  };

  const handlePaginationBack = () => {
    triggerFetchEntity(APPLICATION_ROUTES.POSTS, {}, page - 1, limit);
    document.getElementsByClassName("table-subContainer")[0].scrollTo(0, 0);
  };

  const deletePost = (postRef) => {
    triggerGenericApiHit(
      APPLICATION_ROUTES.DELETE_POST,
      { postRef },
      APPLICATION_ROUTES.POSTS,
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
        <title>Posts</title>
      </Head>

      <section className="content">
        <section className="content-top">
          <div className="content-heading">Posts</div>
          <div className="content-top-left contend-top-left-margin">
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
                  list.map((post, index) =>
                    TableRow(post, index, deletePost, page, limit)
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
  const { fetching, modalState, posts, apiMessage, imgModalState } = state;
  return {
    fetching,
    modalState,
    posts,
    apiMessage,
    imgModalState,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
