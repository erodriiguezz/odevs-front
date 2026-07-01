import { notFound } from 'next/navigation';
import groups from '@/lib/data/groups';
import Image from 'next/image';
import Link from 'next/link';
import { platforms } from '@/lib/data/platforms';

export default async function GroupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const group = groups[slug];
  if (group === undefined) notFound();

  return <div className="flex flex-row justify-center min-h-screen items-center mt-[-6rem] mb-[-10rem] bg-zinc-900">
  <div className="flex flex-col items-center gap-5 max-w-7xl">
    <div className={`flex flex-row items-center gap-10 ${group.category.darkBackground} rounded-2xl p-4`}>
      {group.logo && <Image src={group.logo} width={48} height={48} alt={group.name + " logo"}></Image>}
      <h2 className="text-5xl font-bold">
        {group.name}
      </h2>
    </div>
    <div className="flex flex-row items-center gap-10 mt-[-3]">
      <span>{group.description}</span>
      <span className="font-semibold">Topic: {group.topic}</span>
    </div>
    {group.longDescription && <>
      <hr className="bg-zinc-100 w-[75%] shrink-0 mt-4"></hr>
      <p>{group.longDescription}</p>
    </>}
    {group.eventSources.map((source, i) => 
      <div key={i} className="flex flex-col items-center gap-2 border border-zinc-300 p-5 rounded-3xl bg-zinc-800">
        <div className="flex flex-row items-center justify-center gap-6">
          <Link href={source.url} className="flex flex-row items-center justify-center gap-1 transition-scale duration-500 hover:scale-110" target="_blank">
              {platforms[source.platform].logo !== undefined && 
                <Image
                  src={platforms[source.platform].logo?.image.src as string}
                  className="max-h-10"
                  width={(platforms[source.platform].logo as {image: {width: number}}).image.width/(platforms[source.platform].logo as {image: {height: number}}).image.height*40}
                  height={10} alt={source.platform + " logo"}>
                </Image>}
              {(platforms[source.platform].logo === undefined || !(platforms[source.platform].logo?.containsName)) && <span>{source.platform.replace(/./, (c) => c.toUpperCase())}</span>}
              <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
          </Link>
          {source.title && <span className="whitespace-nowrap">{source.title}</span>}
          {source.members && <span className="whitespace-nowrap">{source.members} members</span>}
        </div>
        {source.image && <img src={source.image} alt={source.platform + " image"} className="max-w-100 border-5 border-zinc-100 rounded-xl"/>}
        {source.description && <p className="whitespace-pre-line">{source.description}</p>}
      </div>
    )}
  </div>
</div>;
}