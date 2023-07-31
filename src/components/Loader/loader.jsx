import loaderStyle from "./loader.module.css";

const Loader = () => {
  return (
    <div className={loaderStyle.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
