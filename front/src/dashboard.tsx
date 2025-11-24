import { useState, useEffect } from 'react';
import { Wind, Droplets, Sun, AlertTriangle, ThermometerSun, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './dashboard.css'; // CSS 파일 임포트

type EnvironmentEffects = {
  highDust: boolean;
  highTemp: boolean;
  highHumidity: boolean;
  strongLight: boolean;
};


const SmartWindowDashboard = () => {
  const [windowOpen, setWindowOpen] = useState(false);
  const [weatherType, setWeatherType] = useState('sunny'); // sunny, cloudy, rainy
  const [environmentEffects, setEnvironmentEffects] = useState({
    highDust: false,
    highTemp: false,
    highHumidity: false,
    strongLight: false
  });

  const [sensorData, setSensorData] = useState({
    dust: 35,
    rain: false,
    temperature: 22,
    humidity: 55,
    lightLevel: '중',
    timestamp: new Date().toLocaleTimeString('ko-KR')
  });

  const [historyData, setHistoryData] = useState([
    { time: '10:00', dust: 25, temp: 20, humidity: 50 },
    { time: '11:00', dust: 30, temp: 21, humidity: 52 },
    { time: '12:00', dust: 28, temp: 22, humidity: 54 },
    { time: '13:00', dust: 35, temp: 23, humidity: 55 },
    { time: '14:00', dust: 40, temp: 24, humidity: 53 },
    { time: '15:00', dust: 35, temp: 22, humidity: 55 }
  ]);

  // 실시간 데이터 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        dust: Math.floor(Math.random() * 50) + 20,
        rain: Math.random() > 0.8,
        temperature: Math.floor(Math.random() * 10) + 18,
        humidity: Math.floor(Math.random() * 30) + 40,
        lightLevel: ['상', '중', '하'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toLocaleTimeString('ko-KR')
      };
      setSensorData(newData);

      // 히스토리 데이터 업데이트
      setHistoryData(prev => {
        const newHistory = [...prev.slice(-5), {
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          dust: newData.dust,
          temp: newData.temperature,
          humidity: newData.humidity
        }];
        return newHistory;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

const toggleEnvironmentEffect = (effect: keyof EnvironmentEffects) => {
  setEnvironmentEffects((prev: EnvironmentEffects) => ({
    ...prev,
    [effect]: !prev[effect],
  }));
};

  const getDustLevel = (value: any) => {
    if (value <= 30) return { level: '좋음', color: 'text-green-500', bg: 'bg-green-50' };
    if (value <= 50) return { level: '보통', color: 'text-yellow-500', bg: 'bg-yellow-50' };
    return { level: '나쁨', color: 'text-red-500', bg: 'bg-red-50' };
  };

  const getLightColor = (level: any) => {
    if (level === '상') return 'text-yellow-400';
    if (level === '중') return 'text-orange-400';
    return 'text-gray-400';
  };

  const dustInfo = getDustLevel(sensorData.dust);
  const hasWarning = sensorData.dust > 50 || sensorData.rain;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">스마트 창문 제어</h1>
          <p className="text-gray-600">실시간 환경 모니터링 및 제어</p>
        </div>

        {/* 경고 알림 (우측 상단 모달) */}
        {hasWarning && (
          <div className="fixed top-6 right-6 z-50 animate-slide-in">
            <div className="bg-white rounded-xl shadow-2xl border-l-4 border-red-500 p-5 max-w-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="text-red-500" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-800 mb-2 text-lg">환경 경고</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    {sensorData.rain && '🌧️ 비가 감지되었습니다. '}
                    {sensorData.dust > 50 && '💨 미세먼지 농도가 높습니다. '}
                    창문을 닫는 것을 권장합니다.
                  </p>
                  <div className="mt-3 pt-3 border-t border-red-100">
                    <p className="text-xs text-gray-500">
                      {sensorData.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 창문 애니메이션 및 제어 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* 창문 애니메이션 */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-96 h-72 bg-gray-800 rounded-lg overflow-hidden border-8 border-gray-700 shadow-2xl">
              {/* 창문 프레임 배경 (날씨별 배경) */}
              <div className={`absolute inset-0 transition-all duration-1000 ${
                weatherType === 'sunny' ? 'bg-gradient-to-b from-sky-400 to-sky-200' :
                weatherType === 'cloudy' ? 'bg-gradient-to-b from-gray-400 to-gray-300' :
                'bg-gradient-to-b from-gray-600 to-gray-500'
              }`}>
                {/* 맑은 날 - 구름과 태양 */}
                {weatherType === 'sunny' && (
                  <>
                    <div className="absolute top-8 left-12 w-20 h-10 bg-white rounded-full opacity-70"></div>
                    <div className="absolute top-12 right-16 w-24 h-12 bg-white rounded-full opacity-60"></div>
                    <div className="absolute top-20 left-24 w-16 h-8 bg-white rounded-full opacity-50"></div>
                    {/* 태양 */}
                    <div className="absolute top-6 right-6 w-16 h-16 bg-yellow-300 rounded-full shadow-lg">
                      <div className="absolute inset-0 animate-pulse bg-yellow-200 rounded-full opacity-50"></div>
                    </div>
                  </>
                )}

                {/* 구름 많은 날 */}
                {weatherType === 'cloudy' && (
                  <>
                    <div className="absolute top-4 left-8 w-28 h-16 bg-gray-100 rounded-full opacity-90 shadow-md"></div>
                    <div className="absolute top-12 right-12 w-32 h-18 bg-gray-100 rounded-full opacity-85 shadow-md"></div>
                    <div className="absolute top-20 left-16 w-24 h-14 bg-gray-200 rounded-full opacity-80 shadow-md"></div>
                    <div className="absolute bottom-16 right-8 w-28 h-16 bg-gray-100 rounded-full opacity-90 shadow-md"></div>
                    <div className="absolute bottom-8 left-20 w-20 h-12 bg-gray-200 rounded-full opacity-75 shadow-md"></div>
                  </>
                )}

                {/* 비오는 날 */}
                {weatherType === 'rainy' && (
                  <>
                    {/* 어두운 구름 */}
                    <div className="absolute top-4 left-8 w-32 h-18 bg-gray-700 rounded-full opacity-80 shadow-lg"></div>
                    <div className="absolute top-12 right-10 w-36 h-20 bg-gray-700 rounded-full opacity-85 shadow-lg"></div>
                    <div className="absolute top-8 left-24 w-28 h-16 bg-gray-800 rounded-full opacity-75 shadow-lg"></div>

                    {/* 빗줄기 */}
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-[30px] bg-blue-200 opacity-60 animate-rainfall"
                        style={{
                          left: `${(i * 7 + 5)}%`,
                          top: '-20px',
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </>
                )}

                {/* 미세먼지 효과 */}
                {environmentEffects.highDust && (
                  <div className="absolute inset-0 bg-yellow-900 opacity-30 mix-blend-multiply">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-600 rounded-full opacity-40 animate-float"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      ></div>
                    ))}
                  </div>
                )}

                {/* 고온 효과 */}
                {environmentEffects.highTemp && (
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-red-400 to-transparent opacity-20 animate-heatwave"
                        style={{
                          animationDuration: `${2 + i * 0.5}s`,
                          animationDelay: `${i * 0.3}s`
                        }}
                      ></div>
                    ))}
                  </div>
                )}

                {/* 고습도 효과 */}
                {environmentEffects.highHumidity && (
                  <div className="absolute inset-0 bg-blue-200 opacity-20">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-drip"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDuration: `${2 + Math.random() * 3}s`,
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      ></div>
                    ))}
                  </div>
                )}

                {/* 강한 빛 효과 */}
                {environmentEffects.strongLight && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-yellow-100 opacity-40 animate-pulse"></div>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-2 h-32 bg-yellow-200 opacity-30 animate-spin"
                        style={{
                          transform: `rotate(${i * 45}deg) translateY(-50%)`,
                          transformOrigin: 'center',
                          animationDuration: '20s'
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>

              {/* 창문 프레임 (고정) */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* 세로 중앙 프레임 */}
                <div className="absolute inset-y-0 left-1/2 w-3 bg-gray-700 transform -translate-x-1/2 shadow-lg"></div>
                {/* 가로 중앙 프레임 */}
                <div className="absolute inset-x-0 top-1/2 h-3 bg-gray-700 transform -translate-y-1/2 shadow-lg"></div>
              </div>

              {/* 왼쪽 창문 */}
              <div
                className="absolute top-0 bottom-0 left-0 transition-all duration-1000 ease-in-out z-10"
                style={{
                  width: windowOpen ? '0%' : '50%',
                  opacity: windowOpen ? 0 : 1
                }}
              >
                <div className="w-full h-full bg-white bg-opacity-20 backdrop-blur-sm border-r-2 border-gray-600 relative">
                  <div className="absolute top-4 left-4 w-16 h-24 bg-white opacity-10 rounded-lg"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-16 bg-white opacity-10 rounded-lg"></div>
                  <div className="absolute right-2 top-1/2 w-3 h-10 bg-gray-700 rounded-full transform -translate-y-1/2 shadow-md"></div>
                </div>
              </div>

              {/* 오른쪽 창문 */}
              <div
                className="absolute top-0 bottom-0 right-0 transition-all duration-1000 ease-in-out z-10"
                style={{
                  width: windowOpen ? '0%' : '50%',
                  opacity: windowOpen ? 0 : 1
                }}
              >
                <div className="w-full h-full bg-white bg-opacity-20 backdrop-blur-sm border-l-2 border-gray-600 relative">
                  <div className="absolute top-4 right-4 w-16 h-24 bg-white opacity-10 rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-16 bg-white opacity-10 rounded-lg"></div>
                  <div className="absolute left-2 top-1/2 w-3 h-10 bg-gray-700 rounded-full transform -translate-y-1/2 shadow-md"></div>
                </div>
              </div>

              {/* 바람 효과 (창문 열렸을 때) */}
              {windowOpen && (
                <div className="absolute inset-0 z-15">
                  <div className="absolute top-1/4 left-1/4 w-1 h-12 bg-blue-400 opacity-40 animate-bounce" style={{animationDelay: '0s', animationDuration: '2s'}}></div>
                  <div className="absolute top-1/3 right-1/3 w-1 h-10 bg-blue-400 opacity-40 animate-bounce" style={{animationDelay: '0.3s', animationDuration: '2.2s'}}></div>
                  <div className="absolute bottom-1/3 left-1/3 w-1 h-14 bg-blue-400 opacity-40 animate-bounce" style={{animationDelay: '0.6s', animationDuration: '2.4s'}}></div>
                  <div className="absolute top-1/2 right-1/4 w-1 h-8 bg-blue-400 opacity-40 animate-bounce" style={{animationDelay: '0.9s', animationDuration: '2.6s'}}></div>
                </div>
              )}
            </div>
          </div>

          {/* 날씨 및 환경 효과 컨트롤 */}
          <div className="mb-6 bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            {/* 날씨 선택 (단일 선택) */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">날씨 선택</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setWeatherType('sunny')}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    weatherType === 'sunny'
                      ? 'bg-yellow-400 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  ☀️ 맑은 날
                </button>
                <button
                  onClick={() => setWeatherType('cloudy')}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    weatherType === 'cloudy'
                      ? 'bg-gray-400 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  ☁️ 구름 많음
                </button>
                <button
                  onClick={() => setWeatherType('rainy')}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    weatherType === 'rainy'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  🌧️ 비오는 날
                </button>
              </div>
            </div>

            {/* 환경 효과 선택 (다중 선택) */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">환경 효과 (다중 선택 가능)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => toggleEnvironmentEffect('highDust')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    environmentEffects.highDust
                      ? 'bg-yellow-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  💨 미세먼지
                </button>
                <button
                  onClick={() => toggleEnvironmentEffect('highTemp')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    environmentEffects.highTemp
                      ? 'bg-red-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  🌡️ 고온
                </button>
                <button
                  onClick={() => toggleEnvironmentEffect('highHumidity')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    environmentEffects.highHumidity
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  💧 고습도
                </button>
                <button
                  onClick={() => toggleEnvironmentEffect('strongLight')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    environmentEffects.strongLight
                      ? 'bg-yellow-300 text-gray-800 shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  ☀️ 강한 빛
                </button>
              </div>
            </div>
          </div>

          {/* 제어 버튼 */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">창문 상태</h2>
              <p className="text-gray-600">마지막 업데이트: {sensorData.timestamp}</p>
            </div>
            <button
              onClick={() => setWindowOpen(!windowOpen)}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                windowOpen
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {windowOpen ? '창문 닫기' : '창문 열기'}
            </button>
          </div>
          <div className="mt-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              windowOpen ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
            }`}>
              <Activity size={18} />
              <span className="font-medium">
                {windowOpen ? '열림' : '닫힘'}
              </span>
            </div>
          </div>
        </div>

        {/* 센서 데이터 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* 미세먼지 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Wind className="text-purple-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900">미세먼지</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${dustInfo.bg} ${dustInfo.color}`}>
                {dustInfo.level}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{sensorData.dust}</div>
            <div className="text-sm text-gray-600">㍍/m³</div>
          </div>

          {/* 온도 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <ThermometerSun className="text-red-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">온도</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{sensorData.temperature}°C</div>
            <div className="text-sm text-gray-600">실내 온도</div>
          </div>

          {/* 습도 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Droplets className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">습도</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{sensorData.humidity}%</div>
            <div className="text-sm text-gray-600">상대 습도</div>
          </div>

          {/* 빛 강도 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Sun className={getLightColor(sensorData.lightLevel)} size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">빛 강도</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{sensorData.lightLevel}</div>
            <div className="text-sm text-gray-600">조도 수준</div>
          </div>

          {/* 강우 감지 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${sensorData.rain ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <Droplets className={sensorData.rain ? 'text-blue-600' : 'text-gray-400'} size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">강우 감지</h3>
            </div>
            <div className={`text-3xl font-bold mb-1 ${sensorData.rain ? 'text-blue-600' : 'text-gray-400'}`}>
              {sensorData.rain ? '감지됨' : '없음'}
            </div>
            <div className="text-sm text-gray-600">센서 상태</div>
          </div>
        </div>

        {/* 히스토리 그래프 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">환경 데이터 추이</h3>

          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">미세먼지 농도</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="dust" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">온도</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">습도</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartWindowDashboard;