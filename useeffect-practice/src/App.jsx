import { useEffect, useState } from "react";
import "./App.css"

function App(){
    return (
        <div className="container">
            <PickDate></PickDate>
        </div>
    )
}

function PickDate(){
    const [date, setDate] = useState("");
    const [competition, setCompetition] = useState("");
    const [results, setResults] = useState(null);
    const [compResults, setCompResults] = useState(null);

    useEffect(() => {
        if(date === "") return;
        fetch(`https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${date}`)
        .then(res => res.json())
        .then(results => {
            setResults(
                results
            );
        })
        .catch(err => console.error(err))
    }, [date]);

    useEffect(() => {
        if(competition === "") return;
        fetch(`https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${competition}`)
        .then(res => res.json())
        .then(compResults => {
            setCompResults(
                compResults
            );
        })
        .catch(err => console.error(err))
    }, [competition]);

    return (
        <div className="hero">
            <input 
                type="date" 
                onChange={(e) => setCompetition(e.target.value.split("-").join(""))}
            ></input>
            <h2>Search For A Competition</h2>
            <div>
                {compResults?.events?.[0]?.competitions?.[0]?.competitors?.[0]?.team?.displayName}
                <h2>Vs.</h2>
                {compResults?.events?.[0]?.competitions?.[0]?.competitors?.[1]?.team?.displayName}
            </div>
            <h2>Search For A Date</h2>
            <input 
                type="date" 
                onChange={(e) => setDate(e.target.value.split("-").join(""))}
            ></input>
            <div>
                {results?.events?.[0]?.competitions?.[0]?.competitors?.[0]?.team?.displayName}
                <h2></h2>
                {results?.events?.[0]?.competitions?.[0]?.competitors?.[0]?.winner}
                <img 
                    src={results?.events?.[0]?.competitions?.[0]?.competitors?.[0]?.team?.logo} 
                    alt=""
                    width="150"
                />
            </div>
            <div>
                {results?.events?.map((event, idx) => (
                    <div key={idx} style={{ marginBottom: "20px" }}>
                        <h3>
                            {event?.competitions?.[0]?.competitors?.[0]?.team?.displayName}
                            {" vs "}
                            {event?.competitions?.[0]?.competitors?.[1]?.team?.displayName}
                        </h3>
                        <p>
                            Winner: {
                                event?.competitions?.[0]?.competitors?.find(c => c.winner)?.team?.displayName
                            }
                        </p>
                        <img
                            src={event?.competitions?.[0]?.competitors?.[0]?.team?.logo}
                            alt=""
                            width="50"
                        />
                        <img
                            src={event?.competitions?.[0]?.competitors?.[1]?.team?.logo}
                            alt=""
                            width="50"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;