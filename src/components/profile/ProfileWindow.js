import { useSelector } from 'react-redux';

function ProfileWindow() {
  const theme=useSelector((state)=>state.settings.darkMode);
  return (
    <div className={`${theme?"bg-[#313238]":"bg-stone-200"} p-5 w-full h-screen scrollbar-thin ${theme?"scrollbar-thumb-stone-600":"scrollbar-thumb-stone-400"} scrollbar-thumb-rounded overflow-y-auto`}>
      <div className={`${theme?"text-stone-300":"text-stone-800"} mb-8`}>
        <p className="font-nunito text-3xl">Welcome, Shakya</p>
        <p className="font-nunito">You can check your timeline activity over here</p>
      </div>
      <p className={`${theme?"text-stone-300":"text-stone-800"} text-3xl mb-6`}><i>Timeline</i></p>
      <p className={`${theme?"text-stone-300":"text-stone-800"}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore nihil totam quia quod a non dignissimos, deleniti asperiores rem, neque esse, maxime et aut quis maiores tempore sapiente explicabo at architecto eligendi qui. Laborum praesentium ut quidem, laboriosam cum voluptate reiciendis laudantium illo molestiae quibusdam consectetur odio cumque alias. Consequuntur quisquam eveniet saepe mollitia reprehenderit dolorem, ad necessitatibus, modi iure odit blanditiis sequi repellat porro! Facere fugit non quo a architecto. Eius perspiciatis officiis magnam, debitis consectetur reiciendis dolorem quaerat iure. Animi ut asperiores ex eius tempore soluta reprehenderit? Facilis in eaque porro possimus sit et doloremque eos minima quis dolores praesentium iure distinctio, excepturi, eligendi accusantium consequuntur laborum suscipit nostrum quas commodi nesciunt. Sunt, molestias nam expedita neque labore non esse asperiores officia excepturi dolorem minima maiores quam id, alias numquam ad. Explicabo hic tempora cum beatae ex inventore aperiam, eos mollitia neque obcaecati alias delectus voluptatem officiis natus? Laboriosam cupiditate minima, fugiat eius consectetur recusandae quas vitae, sunt sapiente eaque ipsam aspernatur velit reprehenderit quo! Aperiam, reprehenderit, aliquam incidunt, beatae quos quasi sit soluta iure ex nihil pariatur voluptatibus quaerat recusandae voluptatem asperiores corrupti adipisci dignissimos magnam repudiandae quas? A error et, dolore eveniet sit, nisi assumenda debitis neque doloremque ad iure architecto. Praesentium distinctio harum quibusdam quam cumque libero minima impedit fugit temporibus quo, enim aliquid hic dicta, at quia qui. Amet quo omnis reiciendis accusantium quisquam, voluptates, provident inventore, atque assumenda magnam quam distinctio itaque illum vero? Doloribus hic et cum. Beatae similique ducimus laudantium voluptas accusantium facere ea. Sit, iure. Cum quisquam deleniti, delectus quae autem architecto saepe eligendi doloribus quo quasi sequi rerum at ipsum corrupti nulla totam repellendus in enim veritatis, dolor, aperiam qui cupiditate? Itaque ullam reiciendis natus recusandae repudiandae perspiciatis odio, totam vero assumenda temporibus necessitatibus error sequi quam debitis excepturi. sfdddddddddddddd 
      dfd feffef efe fwfe fefwfew ffef</p>
    </div>
  )
}

export default ProfileWindow