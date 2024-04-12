import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { CreateEditUserModal } from "./createEditTrainModal/CreateEditTrainModal";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal";
import { AddScheduleModal } from "./addScheduleModal/AddScheduleModal";
import { useNavigate } from "react-router-dom";

export const Trains = ({
  trainData,
  setRefetch,
  handleOnDeleteTrain,
  handleOnDeleteTrainSchedule,
  trainScheduleData,
}) => {
  const [isAddUser, setIsAddUser] = useState(false);
  const [isEditUser, setIsEditUser] = useState();
  const [isAddSchedule, setIsAddSchedule] = useState(false);
  const [isEditSchedule, setIsEditSchedule] = useState();
  const [isDeleteUser, setIsDeleteUser] = useState();
  const [isDeleteSchedule, setIsDeleteSchedule] = useState();
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("user"));

  if (localUser?.data?.userType !== "b-office") {
    return navigate("/home");
  }

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          padding: 10,
        }}>
        <Button onClick={() => setIsAddUser(true)}>New Train</Button>
      </div>
      {trainData?.data && !!trainData.data.length ? (
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Train Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(trainData?.data || []).map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.trainName}</td>
                  <td onClick={() => setIsEditUser(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                  </td>
                  <td onClick={() => setIsDeleteUser(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <>No Trains Available</>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          padding: 10,
        }}>
        <Button onClick={() => setIsAddSchedule(true)}>New Schedule</Button>
      </div>
      {trainScheduleData?.data && !!trainScheduleData.data.length ? (
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>Train Name</th>
              <th>Depature Station</th>
              <th>Arrival Station</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(trainScheduleData?.data || []).map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    {trainData?.data &&
                      trainData.data.find((val) => val.id === item.trainId)
                        .trainName}
                  </td>
                  <td>{item.departureStation}</td>
                  <td>{item.arrivalStation}</td>
                  <td onClick={() => setIsEditSchedule(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                  </td>
                  <td onClick={() => setIsDeleteSchedule(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <>No Train Schedule Available</>
      )}
      <CreateEditUserModal
        isOpen={isAddUser}
        onClose={() => setIsAddUser(false)}
        setRefetch={setRefetch}
        type={"add"}
      />
      {isEditUser && (
        <CreateEditUserModal
          isOpen={!!isEditUser}
          editUser={isEditUser}
          onClose={() => setIsEditUser()}
          setRefetch={setRefetch}
          type={"edit"}
        />
      )}
      {isAddSchedule && (
        <AddScheduleModal
          isOpen={!!isAddSchedule}
          onClose={() => setIsAddSchedule()}
          trainData={trainData}
          setRefetch={setRefetch}
          type={"add"}
        />
      )}
      {isEditSchedule && (
        <AddScheduleModal
          isOpen={!!isEditSchedule}
          editUser={isEditSchedule}
          onClose={() => setIsEditSchedule()}
          setRefetch={setRefetch}
          trainData={trainData}
          type={"edit"}
        />
      )}
      {isDeleteUser && (
        <DeleteModal
          isOpen={!!isDeleteUser}
          onClose={() => setIsDeleteUser()}
          name={isDeleteUser?.userName}
          onSubmit={() => handleOnDeleteTrain(isDeleteUser?.id)}
        />
      )}
      {isDeleteSchedule && (
        <DeleteModal
          isOpen={!!isDeleteSchedule}
          onClose={() => setIsDeleteSchedule()}
          name={isDeleteSchedule?.userName}
          onSubmit={() => handleOnDeleteTrainSchedule(isDeleteSchedule?.id)}
        />
      )}
    </div>
  );
};

// "status": true,
