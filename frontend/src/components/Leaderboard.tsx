import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const { data: leaderboardData } = useQuery({
    queryKey: ["Leaderboard"],
    queryFn: () =>
      axios.get("http://localhost:8080/leaderboard").then((res) => res.data),
  });

  const { data: communities, isLoading: communitiesLoading } = useQuery({
    queryKey: ["communities"],
    queryFn: () =>
      axios.get("http://localhost:8080/community").then((res) => res.data),
  });

  // Check if either communities data is loading or undefined
  if (communitiesLoading || communities === undefined) {
    return <div>Loading...</div>;
  }

  // Fills Total Experience column with users in leaderboardData or 0 if no users
  const renderTotalExp = (communityName: string) => {
    const communityData = (leaderboardData || []).find(
      (data: any) => data.name === communityName
    );

    return communityData ? communityData.totalExperience : 0;
  };

  const renderTotalUsers = (communityName: string) => {
    const communityData = (leaderboardData || []).find(
      (data: any) => data.name === communityName
    );

    return communityData ? communityData.totalUsers : 0;
  };

  // Sort communities by totalExp in descending order
  communities.sort(
    (a: any, b: any) => renderTotalExp(b.name) - renderTotalExp(a.name)
  );

  return (
    <div className="leaderboardContainer">
      <h1>Community Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Community</th>
            <th>Users</th>
            <th className="expHeader">EXP</th>
          </tr>
        </thead>
        <tbody>
          {communities.map((community: any, index: number) => (
            <tr key={community.name}>
              <td>{index + 1}</td>
              <td className="communityCol">
                <img
                  src={community.logo}
                  alt="Community Logo"
                  style={{ width: "50px", height: "50px" }}
                />
                {community.name}
              </td>
              <td>{renderTotalUsers(community.name)}</td>

              <td className="exp"> {renderTotalExp(community.name)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
