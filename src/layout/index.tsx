import TopNavigation from "./topnavigation";

const style = {
  container: "bg-gray-900 h-screen overflow-hidden relative",
  mainContainer: "flex flex-col h-screen pl-0 w-full lg:space-y-4",
  main: "h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4",
};

const MasterLayout: React.FC = ({ children, ...props }) => {
  return (
    <div className={style.container}>
      <div className="flex items-start">
        <div className={style.mainContainer}>
          <TopNavigation />
          <main className={style.main}>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
