export default function Home() {
  return (
    <div className="flex-col ">
      <div className=" w-min mx-auto mt-10">
        <h1 className="p-4 text-2xl">My recent played songs is below</h1>
        <iframe
          src="https://lastfm-recent-tracks-production.up.railway.app/api/bmi921"
          className="w-[390px] h-[800px]"
          title="Recently Played Tracks"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
