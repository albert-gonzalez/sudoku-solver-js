import githubIcon from "../../assets/github.png";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between h-12 bg-zinc-800 mb-12 pl-4 text-white  shadow shadow-gray-500">
      <div className="w-48 pr-4 font-bold block">Sudoku Solver</div>
      <a
        className="flex hover:bg-gray-700 cursor-pointer h-full items-center px-6"
        href="https://github.com/albert-gonzalez/sudoku-solver-js"
      >
        <img src={githubIcon} alt="Github Mark" className="w-6 mr-2" />
        <span>Github</span>
      </a>
    </header>
  );
};

export default Header;
