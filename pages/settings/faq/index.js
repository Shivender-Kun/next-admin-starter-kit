import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { FAQ_STATE, FAQ_ADD } from "../../../redux/actions/actionTypes";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import Pagination from "../../../components/Pagination";
import { APPLICATION_ROUTES } from "../../../constants";
import { SerialIdFunction } from "../../../util/regFun";
import { connect } from "react-redux";
import {
  genericUpdateState,
  genericApiHit,
  fetchEntity,
} from "../../../redux/actions";
import React from "react";
import "./index.module.scss";

const FaqEdit = ({
  question,
  answer,
  addEditFaq,
  editFaqList,
  faqId,
  page,
  limit,
  index,
}) => {
  return (
    <tr className="body-tr">
      <td>{SerialIdFunction(limit * page - 10 + index + 1)}</td>
      <td style={{ width: "25%" }}>
        <div className="faq-input-container">
          <textarea
            id="queEditFaq"
            className="faq-input"
            defaultValue={question}
          />
        </div>
      </td>
      <td style={{ width: "60%" }}>
        <div className="faq-input-container">
          <textarea
            id="ansEditFaq"
            className="faq-input"
            defaultValue={answer}
          />
        </div>
      </td>
      <td className="custom-td-remove" style={{ textAlign: "right" }}>
        <button
          onClick={() => {
            addEditFaq(
              document.getElementById("queEditFaq").value,
              document.getElementById("ansEditFaq").value,
              faqId
            );
          }}
          className="delete-button btn"
          style={{ marginRight: "20px" }}
          aria-label="save edited faq"
        >
          <SaveOutlinedIcon />
        </button>
      </td>
      <td className="custom-td-remove">
        <button
          onClick={() => {
            editFaqList(0, true);
          }}
          className="delete-button btn"
          style={{ marginRight: "20px" }}
          aria-label="cancel edited faq"
        >
          <CancelOutlinedIcon />
        </button>
      </td>
    </tr>
  );
};

let deleteFaqId = null;

const Faq = (props) => {
  const handlePaginationNext = (e) => {
    e.preventDefault();
    const {
      faqs: {
        faqsData: { page, limit },
      },
      triggerFetchEntity,
    } = props;
    triggerFetchEntity(APPLICATION_ROUTES.FAQ_LIST, {}, page + 1, limit);
  };

  const handlePaginationBack = (e) => {
    e.preventDefault();
    const {
      faqs: {
        faqsData: { page, limit },
      },
      triggerFetchEntity,
    } = props;
    triggerFetchEntity(APPLICATION_ROUTES.FAQ_LIST, {}, page - 1, limit);
  };

  const handleFaqAddState = (value) => {
    const { triggerUpdateState } = props;
    triggerUpdateState(FAQ_ADD, { value });
  };

  const editFaqList = (index, remove) => {
    const {
      faqs: { faqsData },
      triggerUpdateState,
    } = props;

    const newFaqs = { ...faqsData };

    const list = newFaqs.list.map((item, i) => {
      if (index === i && !remove) {
        return Object.assign({}, item, { edit: true });
      } else {
        return Object.assign({}, item, { edit: false });
      }
    });

    triggerUpdateState(FAQ_STATE, { ...newFaqs, list });
  };

  const addEditFaq = (question, answer, faqID) => {
    if (!(answer && question)) {
      alert("Question and Answer are Required");
    } else {
      if (faqID) {
        props.triggerGenericApiHit(
          APPLICATION_ROUTES.FAQ_EDIT,
          { faqRef: faqID, answer, question },
          APPLICATION_ROUTES.FAQ_LIST,
          faqsData?.page,
          10
        );
      } else {
        props.triggerGenericApiHit(
          APPLICATION_ROUTES.FAQ_ADD,
          { answer, question },
          APPLICATION_ROUTES.FAQ_LIST,
          faqsData?.page,
          10
        );
        handleFaqAddState(false);
      }
      editFaqList(0, true);
    }
  };

  const deleteFaq = () => {
    props.triggerGenericApiHit(
      APPLICATION_ROUTES.FAQ_DELETE,
      { faqRef: deleteFaqId },
      APPLICATION_ROUTES.FAQ_LIST,
      faqsData?.page,
      10
    );
    //handleCouponModal();
  };

  const {
    faqs: { faqsData },
    faqAddState,
  } = props;

  return (
    <section className="content-container">
      <section className="content">
        <section className="content-top">
          <div
            className="content-heading"
            style={{ display: "flex", alignItems: "center" }}
          >
            <QuestionAnswerOutlinedIcon fontSize="large" />
            &nbsp;FAQ's
          </div>
          <div className="content-top-left">
            {faqsData &&
              faqsData?.list?.length > 0 &&
              Pagination({
                page: faqsData?.page,
                limit: faqsData?.limit,
                total: faqsData?.total,
                length: faqsData?.size,
                nextHandler: handlePaginationNext,
                previousHandler: handlePaginationBack,
              })}
            <button
              onClick={() => {
                handleFaqAddState(!faqAddState.value);
                editFaqList(0, true);
              }}
              className="block-button btn"
              aria-label="add new faq"
            >
              Add New FAQ
            </button>
          </div>
        </section>
        <div className="table-container" style={{ marginTop: "40px" }}>
          <div className="table-subContainer">
            <table className="table">
              <thead className="table-head">
                <tr className="head-tr">
                  <th>Sr no.</th>
                  <th>Questions</th>
                  <th>Answers</th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-body">
                {faqAddState.value ? (
                  <tr className="body-tr" key="faqAdd">
                    <td></td>
                    <td>
                      <textarea id="queFAQ" className="faq-input" />
                    </td>
                    <td>
                      <textarea id="ansFAQ" className="faq-input" />
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          addEditFaq(
                            document.getElementById("queFAQ").value,
                            document.getElementById("ansFAQ").value
                          );
                        }}
                        className="delete-button btn"
                        aria-label="save faq"
                      >
                        <SaveOutlinedIcon />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleFaqAddState(false);
                        }}
                        className="delete-button btn"
                        aria-label="cancel new faq"
                      >
                        <CancelOutlinedIcon />
                      </button>
                    </td>
                  </tr>
                ) : null}
                {faqsData && faqsData?.list?.length ? (
                  faqsData?.list.map((faq, index) => {
                    return faq && faq.edit ? (
                      <FaqEdit
                        key={faq._id + index}
                        question={faq.question}
                        answer={faq.answer}
                        addEditFaq={addEditFaq}
                        editFaqList={editFaqList}
                        faqId={faq._id}
                        limit={faqsData.limit}
                        page={faqsData.page}
                        index={index}
                      />
                    ) : (
                      <tr className="body-tr" key={faq._id + index}>
                        <td>
                          {SerialIdFunction(
                            faqsData.limit * faqsData.page - 10 + index + 1
                          )}
                        </td>
                        <td style={{ width: "25%" }}>{faq.question}</td>
                        <td style={{ width: "60%" }}>{faq.answer}</td>
                        <td>
                          <button
                            onClick={() => {
                              editFaqList(index);
                              handleFaqAddState(false);
                            }}
                            className="delete-button btn"
                            aria-label="edit faq"
                          >
                            <EditOutlinedIcon />
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              deleteFaqId = faq._id;
                              confirm(
                                "Are you sure you want to delete this FAQ?"
                              ) && deleteFaq();
                            }}
                            className="delete-button btn"
                            aria-label="delete faq"
                          >
                            <DeleteOutlineOutlinedIcon />
                          </button>
                        </td>
                      </tr>
                    );
                  })
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
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerFetchEntity: (endpoint, payload, page, limit) =>
      dispatch(fetchEntity({ endpoint, payload, page, limit })),
    triggerUpdateState: (type, value) =>
      dispatch(genericUpdateState({ type, value })),
    triggerGenericApiHit: (endpoint, payload, listingEndpoint, page, limit) =>
      dispatch(
        genericApiHit({ endpoint, payload, listingEndpoint, page, limit })
      ),
  };
};

const mapStateToProps = (state) => {
  const { faqs, faqAddState } = state;
  return { faqs, faqAddState };
};

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
