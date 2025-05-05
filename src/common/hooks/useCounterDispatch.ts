import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";


export const useCounterDispatch = () => useDispatch<AppDispatch>();