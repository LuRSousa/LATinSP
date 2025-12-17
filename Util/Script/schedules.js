const formatTime = hora => hora.slice(0, 5);

//OBTER INFORMAÇÕES DE HORÁRIO ATUAL/ GET CURRENT SCHEDULE INFORMATION
function getScheduleInfo(schedule) {
    const today = new Date();
    const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const dayOfWeek = days[today.getDay()];
    const now = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0'); //Formato HH:MM

    const scheduleToday = schedule.filter(h => h.week_day === dayOfWeek);

    return {
        days, dayOfWeek, now, scheduleToday
    };
}

//VERIFICAR SE RESTAURANTE ESTÁ ABERTO / CHECK IF RESTAURANT IS OPEN
function isOpen(schedule) {
    const {now, scheduleToday} = getScheduleInfo(schedule);

    return scheduleToday.some(h => {
        return now >= h.open && now <= h.close;
    });
}

//OBTER PRÓXIMO HORÁRIO DE FUNCIONAMENTO / GET NEXT SCHEDULE INFORMATION
function getNextSchedule(schedule) {
    const {now, days, dayOfWeek, scheduleToday} = getScheduleInfo(schedule);

    const openNow = scheduleToday.filter(h => now >= h.open && now <= h.close);

    //Se restaurante estiver aberto / If restaurant is open
    if (openNow.length > 0) {
        const nextCloseTime = openNow.map(h => h.close).sort()[0];
        return `Fecha às ${formatTime(nextCloseTime)}`;
    }

    //Se restaurante estiver fechado / If restaurant is closed
    const futureSchedules = scheduleToday.filter(h => h.open > now);
    if (futureSchedules.length > 0) {
        const nextOpenTime = futureSchedules.map(h => h.open).sort()[0];
        return `Abre às ${formatTime(nextOpenTime)}`;
    } 

    //Procurar próximo horário nos próximos dias / Look for next schedule in the next days
    const todayIndex = days.indexOf(dayOfWeek);
    for (let i = 1; i <= 7; i++) {
        const nextIndex = (todayIndex + i) % 7;
        const nextDay = days[nextIndex];
        const horariosProximos = schedule.filter(h => h.week_day === nextDay && h.open !== "00:00");

        if (horariosProximos.length > 0) {
            const proximoHorario = horariosProximos.map(h => h.open).sort()[0];
            return `Abre ${nextDay} às ${formatTime(proximoHorario)}`;
        }
    }


    return "Sem horários disponíveis";
}