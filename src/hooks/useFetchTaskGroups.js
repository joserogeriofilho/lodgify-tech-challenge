import { useState, useEffect } from 'react';

const URL =
  'https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress';

const IDLE = 'idle';
const LOADING = 'loading';
const FETCHED = 'fetched';
const ERROR = 'error';

const initialState = {
  taskGroups: undefined,
  status: IDLE,
  error: undefined,
};

export function useFetchTaskGroups() {
  const [state, setState] = useState(initialState);

  const getTaskGroups = async (signal) => {
    try {
      setState((prevState) => ({
        ...prevState,
        status: LOADING,
      }));

      const response = await fetch(URL, signal);
      const data = await response.json();

      setState((prevState) => ({
        ...prevState,
        taskGroups: data,
        status: FETCHED,
      }));
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        status: ERROR,
        error: err,
      }));
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getTaskGroups(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return state;
}
