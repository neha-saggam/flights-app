import axios from 'axios';

const URL =`http://starlord.hackerearth.com/movieslisting`;

export function getMovies() {

  const request = axios.get(URL);
  console.log(request);
    return {
      type: FETCH_MOVIES_SUCCESSFUL,
      payload: request.data
      };

}
