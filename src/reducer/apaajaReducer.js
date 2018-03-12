export default function reducer(state={
    dataRandom1: null,
    dataRandom2: "nulljuga"
  }, action) {

    if(action.type == null) {
      return {
        ...state,
        dataRandom1: null
      };
    } else {
      return state;
    }
}
