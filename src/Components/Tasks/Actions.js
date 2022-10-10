import axios from "axios";

export const getUserData = async (
  dispatch,
  token,
  currentPage = 1,
  pageLimit = 3
) => {
  try {
    axios
      .get(
        `https://bitrix-clone.herokuapp.com/usertasks?page=${currentPage}&limit=${pageLimit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) =>
        dispatch({
          type: "loadUserData",
          payload: { data: data.data.jobs, count: data.data.count },
        })
      );
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (el, dispatch, token) => {
  try {
    await axios.delete(
      `https://bitrix-clone.herokuapp.com/usertasks/${el._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (
  id,
  change,
  dispatch,
  token,
  currentPage,
  pageLimit
) => {
  try {
    await axios
      .patch(`https://bitrix-clone.herokuapp.com/usertasks/${id}`, change, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getUserData(dispatch, token, currentPage, pageLimit);
      });
  } catch (err) {
    console.log(err);
  }
};

export const SortDataAPI = async (
  dispatch,
  token,
  currentPage,
  pageLimit,
  key,
  change
) => {
  try {
    await axios
      .get(
        `https://bitrix-clone.herokuapp.com/usertasks?page=${currentPage}&limit=${pageLimit}&type=${key}&sort=${change}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        dispatch({
          type: "loadUserData",
          payload: { data: data.data.jobs, count: data.data.count },
        });
      });
  } catch (err) {
    console.log(err);
  }
};
