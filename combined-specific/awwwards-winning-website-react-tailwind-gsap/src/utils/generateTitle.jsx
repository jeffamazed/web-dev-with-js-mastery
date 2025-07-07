// use this to avoid using dangerouslysetinnerhtml

export const generateTitle = (title) => {
  const lines = title.split("<br />");

  return (
    <>
      {lines.map((line, i) => {
        const words = line.split(" ");

        return (
          <span key={i} className="flex-center flex-wrap">
            {words.map((word, j) => {
              const match = word.match(/^([^()]*?)\((\w)\)([^()]*)$/);

              return (
                <span key={j} className="animated-word">
                  {match ? (
                    <>
                      {match[1]}
                      <b>{match[2]}</b>
                      {match[3]}
                    </>
                  ) : (
                    word
                  )}
                  {j < words.length - 1 && <>&nbsp;</>}
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
};
