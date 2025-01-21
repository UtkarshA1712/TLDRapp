const NeubrutalismButton = ({ onClick, loading }) => {
    return (
      <button
        onClick={!loading ? onClick : null}
        disabled={loading}
        className={`group/button rounded-lg bg-[#222222] text-white  ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span
          className={`block -translate-x-1 -translate-y-1 rounded-lg border-2 border-[#222222] bg-[#ff527a] px-20 py-2 text-sm font-medium tracking-tight transition-all 
            ${loading ? '' : 'group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0'}
          `}
        >
          {loading ? 'Generating...' : 'Generate Summary'}
        </span>
      </button>
    );
  };
  
  export default NeubrutalismButton;
  