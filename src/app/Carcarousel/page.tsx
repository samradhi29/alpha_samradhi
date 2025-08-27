"use client";
import CarDetails from "../Details/page";
import PriceCalculator from "../pricecalculator/page";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sparkles, Car, Info } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function CarShowcase() {
  const [show3D, setShow3D] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Welcome animation
  useEffect(() => {
    const sequence = [
      () => setAnimationStep(1),
      () => setAnimationStep(2),
      () => setAnimationStep(3),
      () => setShowWelcome(false),
    ];

    const timeouts = [
      setTimeout(sequence[0], 500),
      setTimeout(sequence[1], 1500),
      setTimeout(sequence[2], 2500),
      setTimeout(sequence[3], 4500),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // 3D Viewer
  useEffect(() => {
    if (!show3D) return;

    const container = document.getElementById("three-container");
    if (!container || container.hasChildNodes()) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x0a0a1a, 1);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 1.5));

    const loader = new GLTFLoader();
    loader.load("/car1.glb", (gltf) => {
      gltf.scene.scale.set(1.5, 1.5, 1.5);
      scene.add(gltf.scene);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.maxPolarAngle = Math.PI / 2;

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    });

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [show3D]);

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 px-6">
          <div
            className={`transition-all duration-1000 ${
              animationStep >= 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="text-yellow-400 w-12 h-12 animate-spin" />
              <Car className="text-purple-400 w-16 h-16" />
              <Sparkles className="text-yellow-400 w-12 h-12 animate-spin" />
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              WELCOME
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-1000 ${
              animationStep >= 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-2xl md:text-4xl text-white font-light mb-2">
              to the best
            </p>
            <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CAR SHOP
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-2000 ${
              animationStep >= 3
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-75"
            }`}
          >
            <button
              onClick={() => setShowWelcome(false)}
              className="mt-12 px-12 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white text-xl font-bold rounded-full shadow-2xl hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 transform hover:scale-110 transition-all duration-300 animate-pulse"
            >
              Enter Gallery ✨
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* ===== Top Right Car Details Button ===== */}
      <div className="fixed top-6 right-6 z-40">
        <button
          onClick={() => setShowDetails(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          <Info className="w-5 h-5" />
          View Details
          <Sparkles className="w-4 h-4 animate-pulse" />
        </button>
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
          <h2 className="text-5xl font-medium text-center mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            Luxury Car Gallery
          </h2>
          
          <p className="text-center text-gray-400 mb-10 font-medium text-xl">
            Explore our premium collection with immersive 360° view
          </p>

          {/* ===== Car Gallery Section ===== */}
          <section className="bg-gradient-to-br from-white to-slate-300 rounded-3xl shadow-amber-100 shadow-xl p-10">
            {!show3D ? (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="rounded-xl overflow-hidden"
              >
                <SwiperSlide>
                  <div className="relative">
                    <img
                      src="/car1.jpg"
                      alt="Car 1"
                      className="rounded-xl w-full object-cover shadow-lg"
                    />
                    <button
                      onClick={() => setShow3D(true)}
                      className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-blue-600/90 backdrop-blur-md text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition"
                    >
                      🔄 View in 360°
                    </button>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/car4.jpg"
                    alt="Car 2"
                    className="rounded-xl w-full object-cover shadow-lg"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/car5.jpg"
                    alt="Car 3"
                    className="rounded-xl w-full object-cover shadow-lg"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/car3.jpg"
                    alt="Car 4"
                    className="rounded-xl w-full object-cover shadow-lg"
                  />
                </SwiperSlide>
              </Swiper>
            ) : (
              <div
                id="three-container"
                className="w-full h-[500px] mt-6 rounded-xl border shadow-inner bg-gray-100"
              ></div>
            )}
          </section>

          {/* ===== Price Calculator Section ===== */}
          <section className="bg-gradient-to-br from-white to-gray-300 rounded-3xl shadow-amber-100 shadow-xl p-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
              💰 Price Calculator
            </h2>
            <div className="animate-fade-in">
              <PriceCalculator />
            </div>
          </section>

          {/* ===== Car Details Modal ===== */}
          {showDetails && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 rounded-3xl p-8 shadow-2xl border border-purple-500/30 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-xl">
                      <Car className="text-purple-400 w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Car Details
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300"
                  >
                    ✕ Close
                  </button>
                </div>
                <CarDetails />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}