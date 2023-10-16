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
  }, [refetch]);

  const handleOnDeleteTrain = (id) => {
    axios.delete(`http://localhost:5246/api/v2/Train/${id}`);
  };

  return (
    <>
      <Trains
        trainData={trainData}
        setRefetch={setRefetch}
        handleOnDeleteTrain={handleOnDeleteTrain}
        trainScheduleData={trainScheduleData}
      />
    </>
  );
};
