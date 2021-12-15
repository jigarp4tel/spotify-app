import React, { useEffect, useState } from 'react'
import { SectionWrapper, TimeRangeButtons, TrackList, Loader } from '../components';
import { getTopTracks } from '../spotify';
import { catchErrors } from '../utils';

const TopTracks = () => {

    const [topTracks, setTopTracks] = useState(null);
    const [activeRange, setActiveRange] = useState('short');

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getTopTracks(`${activeRange}_term`);
            setTopTracks(data);
        };

        catchErrors(fetchData());
    }, [activeRange]);

    return (


        <main>
            {topTracks ?
                (<SectionWrapper title="Top Tracks" breadcrumb={true}>
                    <TimeRangeButtons
                        activeRange={activeRange}
                        setActiveRange={setActiveRange}
                    />
                    <TrackList tracks={topTracks.items} />
                </SectionWrapper>) :
                (
                    <Loader />
                )}
        </main>
    )
}

export default TopTracks
