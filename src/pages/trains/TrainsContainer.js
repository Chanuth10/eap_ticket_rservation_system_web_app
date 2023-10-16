import { useEffect, useState } from "react";
import axios from "axios";
import { Trains } from "./Trains";

export const TrainsContainer = () => {
  const [trainData, setTrainData] = useState();
  const [refetch, setRefetch] = useState(false);
  const [trainScheduleData, setTrainScheduleData] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5246/api/v2/Train")
      .then((data) => setTrainData(data));
    axios
      .get("http://localhost:5246/api/v2/TrainSchedule")
      .then((data) => setTrainScheduleData(data));
  }, []);

  useEffect(() => {
    if (refetch) {
      axios
        .get("http://localhost:5246/api/v2/Train")
        .then((data) => setTrainData(data));
      axios
        .get("http://localhost:5246/api/v2/TrainSchedule")
        .then((data) => setTrainScheduleData(data));
    }
    setRefetch(false);
  }, [refetch]);

  const handleOnDeleteTrain = (id) => {
    axios.delete(`http://localhost:5246/api/v2/Train/${id}`).catch((err) => {
      if (err.response.status !== 500) {
        alert("Cannot delete scheduled train!");
      } else {
        setRefetch(true);
      }
    });
  };
  //TrainSchedule
  const handleOnDeleteTrainSchedule = (id) => {
    axios
      .delete(`http://localhost:5246/api/v2/TrainSchedule/${id}`)
      .then(() => {
        setRefetch(true);
      });
  };

  return (
    <>
      <Trains
        trainData={trainData}
        setRefetch={setRefetch}
        handleOnDeleteTrain={handleOnDeleteTrain}
        handleOnDeleteTrainSchedule={handleOnDeleteTrainSchedule}
        trainScheduleData={trainScheduleData}
      />
    </>
  );
};
