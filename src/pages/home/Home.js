import styles from "./home.module.css";
import { useEffect} from "react";
import Productcards from "../../components/productcards/Productcards";
import { useDispatch } from "react-redux";
import { getProfile } from "../../action";
const Home = () => {
  const {background} = styles;
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProfile())
  },[])
  return (
    <div>
      <div className={background}></div>
      <Productcards />
    </div>
  );
};

export default Home;
