document.addEventListener('DOMContentLoaded',function(){

  // === aside nav ===
  const asideNav = document.querySelectorAll('aside .icon')
  asideNav.forEach(icon=>{
    icon.addEventListener('click',function(){
      asideNav.forEach(icon=>{
        if(icon.classList.contains('active')){
          icon.classList.remove('active')
        }
      })
      this.classList.add('active')
    })
  })

  // === update time ===
  function updateTime(){
    const time = document.querySelector('.navbar .time')
    const now = new Date()
    time.innerText = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false
    })
  }
  updateTime() 
  setInterval(updateTime,1000)

  // === chart ===  
  const fontFamily = `"${getComputedStyle(document.documentElement).getPropertyValue("--font-family").trim()}"`
  const grid = document.querySelector('.grid')
  const options = {
    chart: {
      type: 'line',
      toolbar:{
        show: false
      }
    },
    colors: ['#64889a'],
    series: [{
      name: 'savings',
      data: [30,47,35,50,49,60,70,91,125,112,143,162]
    }],
    tooltip: {
      enabled: true,
      style: {
        fontSize: '5px',
        fontFamily: '"Josefin Sans", sans-serif'
      }
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels:{
        style: {
          fontSize: '5px',
          fontFamily: '"Josefin Sans", sans-serif'
        }
      }
    },
    yaxis: {
      labels:{
        style: {
          fontSize: '5px',
          fontFamily: '"Josefin Sans", sans-serif'
        }
      }
    },
    markers: {
      size: 0,
    },
    stroke: {
      curve: 'smooth',
    }
  }
  
  const chart = new ApexCharts(grid, options)
  
  chart.render()  

  // === dashboard circle ===
  const root = document.documentElement
  function getDashboardCircleValue(){
    const radius = getComputedStyle(root).getPropertyValue('--dashboard-circle-radius')
    const circumference = getComputedStyle(root).getPropertyValue('--dashboard-circle-circumference')
    const progress = getComputedStyle(root).getPropertyValue('--dashboard-circle-progress')
    return {radius, circumference, progress}
  }
  
  function setDashboardCircleValue(radius, progress){
    root.style.setProperty('--dashboard-circle-radius', `${radius}px`)
    root.style.setProperty('--dashboard-circle-circumference', `${2 * Math.PI * radius}px`)
    root.style.setProperty('--dashboard-circle-progress', progress)
  }

  function updateProgress(percent){
    const progress = percent / 100
    setDashboardCircleValue(70, progress)
  }

  updateProgress(20)
})