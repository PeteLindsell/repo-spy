import "./userInfo.css";

type UserInfoProps = {
  avatarUrl: string;
  name: string;
  bio: string;
  location: string;
  followers: number;
  publicRepos: number;
};

export function UserInfo({
  avatarUrl,
  name,
  bio,
  location,
  followers,
  publicRepos,
}: UserInfoProps) {
  return (
    <section className="user-info__wrapper">
      <img src={avatarUrl} alt="" className="user-info__logo" />
      <div>
        <h2>{name}</h2>
        <p>{bio}</p>
        <table>
          <tbody>
            <tr>
              <th>🌎 Location</th>
              <td>{location}</td>
            </tr>
            <tr>
              <th>👀 Followers</th>
              <td>{followers}</td>
            </tr>
            <tr>
              <th>📦 Public Reps</th>
              <td>{publicRepos}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
