import React from 'react';
import { render} from 'react-dom';

import FullCalendar from '../../src';

const App = () => {
    const today = new Date;
    const tomorrow = new Date;

    return (    
        <FullCalendar
            nowIndicator
            header={{
                left: 'prev,today,next',
                center: 'title',
                right: 'dayGridMonth, dayGridWeek, dayGridDay',
            }}
            navLinks
            events={[
                {
                    title: 'Example Event',
                    start: today,
                },
                {
                    title: 'Example Event',
                    start: tomorrow.setDate(today.getDate()+1)
                }
            ]}	
            plugins={[]}
            snapDuration="00:05"
            allDaySlot={false}
            defaultView="dayGridMonth"
        />
    );
};
render(<App />, document.getElementById("root"));