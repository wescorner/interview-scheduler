import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = function (name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(props.id, interview).then(transition(SHOW));
  };

  const del = function (name, interviewer) {
    transition(DELETING);
    const interview = {
      student: name,
      interviewer,
    };
    props.cancelInterview(props.id, interview).then(transition(EMPTY));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty id={props.id} onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={del}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
    </article>
  );
}
