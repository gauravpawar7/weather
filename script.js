const apiKey = '0838b414a58db99c8f30157f7f57120f';

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return alert("Enter a city name");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById('weatherInfo').innerHTML = 'City not found!';
      return;
    }

    const temp = data.main.temp;
    const desc = data.weather[0].main;
    const name = data.name;
    const icon = data.weather[0].icon;

    document.getElementById('weatherInfo').innerHTML = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
      <p>${desc}</p>
      <h3>${temp}°C</h3>
    `;

    let bgUrl = '';
    if (desc === 'Clear') {
      bgUrl = 'url("https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1920&q=80")'; // sunny
    } else if (desc === 'Rain') {
      bgUrl = 'url("https://images.unsplash.com/photo-1600907053334-58769808d946?auto=format&fit=crop&w=1920&q=80")'; // rain
    } else if (desc === 'Clouds') {
      bgUrl = 'url("https://images.unsplash.com/photo-1532298488760-970ff6decf61?auto=format&fit=crop&w=1920&q=80")'; // cloudy
    } else if (desc === 'Snow') {
      bgUrl = 'url("https://images.unsplash.com/photo-1608889178112-8bcf29d611cf?auto=format&fit=crop&w=1920&q=80")'; // snow
    } else {
      bgUrl = 'url("https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1920&q=80")'; // default
    }

    document.body.style.backgroundImage = bgUrl;

  } catch (err) {
    document.getElementById('weatherInfo').innerHTML = 'Failed to load weather.';
    console.log(err);
  }
}
