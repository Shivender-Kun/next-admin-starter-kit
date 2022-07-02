// Imports from node modules.
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Iconbutton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Image from "next/image";

// Imports from custom folders.
import {
  fetchEntity,
  genericUpdateState,
  switchNavigation,
  genericApiHit,
  nullifyApiMessage,
  genericCreateEntity,
} from "../../redux/actions";
import {
  APPLICATION_ROUTES,
  navigationIndexer,
  IMAGE_PREFIXES,
  ASSETS,
} from "../../constants";
import { ACTIVITY_EDIT } from "../../redux/actions/actionTypes";
import PlaceHolderIMG from "../../public/profile.png";
import Pagination from "../../components/Pagination";
import { SerialIdFunction } from "../../util/regFun";
import Main from "../../components/Account";

const TableHead = () => (
  <thead className="table-head custom-head">
    <tr className="head-tr">
      <th>Sr no.</th>
      <th>Name</th>
      <th>Image</th>
      <th>Color</th>
      <th>Actions</th>
      <th></th>
    </tr>
  </thead>
);

const TableRow = (
  activity,
  index,
  deleteActivity,
  limit = 10,
  page = 1,
  editActivityList,
  setAddActivity
) => {
  const imageLoader = (src) => {
    if (src.src != PlaceHolderIMG.src) {
      return `${IMAGE_PREFIXES.IMAGE_SMALL}${src.src}`;
    }
    return src.src;
  };

  return (
    <tr className="body-tr" key={index}>
      <td>{SerialIdFunction(limit * page - limit + index + 1)}</td>
      <td>{activity.name}</td>

      <td>
        <Image
          loader={imageLoader}
          src={activity.image || PlaceHolderIMG}
          onError={(e) => {
            e.target.src = PlaceHolderIMG.src;
            e.target.srcset = PlaceHolderIMG.src;
          }}
          alt={activity.name || "activity"}
          width="78px"
          height="78px"
        />
      </td>
      <td>
        <input
          type="color"
          name="color"
          className="color"
          value={activity.colour}
          disabled
        />
      </td>
      <td>
        <button
          onClick={() => {
            editActivityList(index);
            setAddActivity(false);
          }}
          className="delete-button btn"
          aria-label="edit faq"
        >
          <EditOutlinedIcon />
        </button>
      </td>
      <td>
        <button
          onClick={() => deleteActivity(activity._id)}
          className="block-button btn"
          style={{ marginRight: "20px" }}
          aria-label="delete activity"
        >
          <DeleteOutlineOutlinedIcon />
        </button>
      </td>
    </tr>
  );
};

function Activities(props) {
  const [addActivity, setAddActivity] = useState(false);
  const [picture, setPicture] = useState();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const {
    activities: { page, limit, total, size, list },
    triggerFetchEntity,
    triggerGenericApiHit,
    triggerSwitchNavigation,
    triggerGenericCreateEntity,
    triggerUpdateState,
  } = props;

  useEffect(() => {
    triggerSwitchNavigation(navigationIndexer.activities);
    triggerFetchEntity(APPLICATION_ROUTES.ACTIVITIES, {}, 1, 10);
  }, [triggerSwitchNavigation, triggerFetchEntity]);

  const handleAddActivity = (edit = false, activityRef) => {
    if (!name.length) {
      return alert("activity name must not be empty!");
    }

    if (picture) {
      triggerGenericCreateEntity(
        edit
          ? APPLICATION_ROUTES.EDIT_ACTIVITY
          : APPLICATION_ROUTES.ADD_ACTIVITY,
        { name, colour: color, activityRef },
        APPLICATION_ROUTES.ACTIVITIES,
        true,
        picture && picture,
        page,
        limit
      );
      setAddActivity(false);
      setName("");
      setPicture();
    } else {
      alert("Please select a picture!");
    }
  };

  const editActivityList = (index, remove) => {
    const { activities } = props;

    const list = activities.list.map((item, i) => {
      if (index === i && !remove) {
        setName(activities.list[index].name);
        setColor(activities.list[index].colour);
        return Object.assign({}, item, { edit: true });
      } else {
        return Object.assign({}, item, { edit: false });
      }
    });

    triggerUpdateState(ACTIVITY_EDIT, { ...activities, list });
  };

  const deleteActivity = (activityRef) => {
    confirm("Are you sure you want to delete this activity?") &&
      triggerGenericApiHit(
        APPLICATION_ROUTES.DELETE_ACTIVITY,
        { activityRef },
        APPLICATION_ROUTES.ACTIVITIES,
        page,
        limit
      );
  };

  const handlePicture = (e) => setPicture(e.target.files[0]);

  const handlePaginationNext = () =>
    triggerFetchEntity(APPLICATION_ROUTES.ACTIVITIES, {}, page + 1, limit);

  const handlePaginationBack = () =>
    triggerFetchEntity(APPLICATION_ROUTES.ACTIVITIES, {}, page - 1, limit);

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Main>
      <section className="content">
        <section className="content-top">
          <div
            className="content-heading"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p className="sidebar__mainOption">Activities</p>
          </div>
          <div
            className="content-top-left contend-top-left-margin"
            style={{ flex: "1", justifyContent: "flex-end" }}
          >
            <button
              className="block-button btn"
              aria-label="add new activity"
              onClick={() => {
                setAddActivity(!addActivity);
                setName("");
                setPicture();
                editActivityList();
              }}
              style={{ margin: "10px" }}
            >
              Add activity
            </button>
            {list.length
              ? Pagination({
                  page,
                  limit,
                  total: total.count,
                  length: size,
                  nextHandler: handlePaginationNext,
                  previousHandler: handlePaginationBack,
                })
              : null}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}></div>
        </section>
        <section className="content-bottom">
          <section className="table-container">
            <section className="table-subContainer">
              <table className="table">
                {TableHead()}
                <tbody className="table-body">
                  {addActivity ? (
                    <tr className="body-tr">
                      <td style={{ padding: "5px 15px" }}>00</td>

                      <td>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </td>

                      <td>
                        <label htmlFor="icon-button-file">
                          <Input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            onChange={handlePicture}
                          />
                          <Iconbutton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                          >
                            <PhotoCamera />
                          </Iconbutton>
                        </label>
                      </td>

                      <td>
                        <input
                          type="color"
                          name="color"
                          className="color"
                          id="color"
                          onChange={(e) => setColor(e.target.value)}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleAddActivity(false)}
                          aria-label="save activity"
                          className="delete-button btn"
                        >
                          <SaveOutlinedIcon />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setAddActivity(false);
                          }}
                          className="delete-button btn"
                          aria-label="cancel add new activity"
                        >
                          <CancelOutlinedIcon />
                        </button>
                      </td>
                    </tr>
                  ) : null}

                  {list.length ? (
                    list.map((activity, index) =>
                      activity.edit ? (
                        <tr className="body-tr" key={index}>
                          <td>
                            {SerialIdFunction(limit * page - limit + index + 1)}
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </td>
                          <td>
                            <label htmlFor="icon-button-file">
                              <Input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                onChange={handlePicture}
                              />
                              <Iconbutton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <PhotoCamera />
                              </Iconbutton>
                            </label>
                          </td>
                          <td>
                            <input
                              type="color"
                              name="color"
                              className="color"
                              id="color"
                              onChange={(e) => setColor(e.target.value)}
                              defaultValue={color}
                            />
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                handleAddActivity(true, activity._id)
                              }
                              aria-label="save activity"
                              className="delete-button btn"
                            >
                              <SaveOutlinedIcon />
                            </button>
                          </td>{" "}
                          <td>
                            <button
                              onClick={() => {
                                setAddActivity(false);
                                editActivityList(index, true);
                              }}
                              className="delete-button btn"
                              aria-label="cancel add new activity"
                            >
                              <CancelOutlinedIcon />
                            </button>
                          </td>
                        </tr>
                      ) : (
                        TableRow(
                          activity,
                          index,
                          deleteActivity,
                          limit,
                          page,
                          editActivityList,
                          setAddActivity
                        )
                      )
                    )
                  ) : (
                    <tr>
                      <td className="emptyTable" colSpan="4">
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </section>
        </section>
      </section>
    </Main>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    triggerFetchEntity: (endpoint, payload, page, limit) =>
      dispatch(fetchEntity({ endpoint, payload, page, limit })),
    triggerUpdateState: (type, value) =>
      dispatch(genericUpdateState({ type, value })),
    triggerSwitchNavigation: (active) => dispatch(switchNavigation({ active })),
    triggerGenericApiHit: (endpoint, payload, listingEndpoint, page, limit) =>
      dispatch(
        genericApiHit({ endpoint, payload, listingEndpoint, page, limit })
      ),
    triggerGenericCreateEntity: (
      endpoint,
      payload,
      listingEndpoint,
      multipart,
      picture,
      page,
      limit
    ) =>
      dispatch(
        genericCreateEntity({
          endpoint,
          payload,
          listingEndpoint,
          multipart,
          picture,
          page,
          limit,
        })
      ),
    triggerNullifyApiMessage: () => dispatch(nullifyApiMessage()),
  };
};

const mapStateToProps = (state) => {
  const { apiMessage, fetching, activities } = state;
  return { apiMessage, fetching, activities };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
