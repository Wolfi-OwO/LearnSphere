import PodiumLeaderBoard from "../../components/podium-leaderboard/PodiumLeaderBoard.jsx";



export default function HomePage(){
    const topThree = [
        { name: "Alice", score: 980, avatar: "/alice.png" },  // 1st
        { name: "Bob", score: 870, avatar: "/bob.png" },      // 2nd
        { name: "Charlie", score: 820, avatar: "/charlie.png" } // 3rd
    ];
    return (
        <PodiumLeaderBoard users={topThree} />
    )
}