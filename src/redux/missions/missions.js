import apiService from './missionsApi';

const GET_MISSIONS_DATA = 'space-thub/misssions/GET_MISSIONS_DATA';
const JOIN_MISSION = 'space-thub/misssions/JOIN_MISSION';

export const getMissionsDataAPI = () => async (dispatch) => {
  try {
    const res = await apiService.getAll();
    const { data } = res;
    const selectedData = [];
    data.forEach((element) => {
      selectedData.push({
        mission_id: element.mission_id,
        mission_name: element.mission_name,
        description: element.description,
        reserved: false,
      });
    });
    dispatch({
      type: GET_MISSIONS_DATA,
      payload: selectedData,
    });
  } catch (err) {
    // error
  }
};

export const joinMissionAction = (id) => ({
  type: JOIN_MISSION,
  payload: id,
});

const missionsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_MISSIONS_DATA:
      if (localStorage.getItem('missionsData') === null) {
        return action.payload;
      }
      return (JSON.parse(localStorage.getItem('missionsData')));
    case JOIN_MISSION:
      return state.map((mission) => {
        if (mission.mission_id !== action.payload) {
          return mission;
        }
        return {
          ...mission,
          reserved: !mission.reserved,
        };
      });
    default:
      return state;
  }
};

export default missionsReducer;
