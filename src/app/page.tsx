"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";
import download from "downloadjs";
import { format } from "date-fns";
import * as htmlToImage from "html-to-image";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [text, setText] = useState(
    "DEMO TEXT!!! The Ship of Theseus is a philosophical thought experiment that asks whether an object is the same object after all of its original parts have been replaced. The experiment is also known as Theseus's Paradox.\n\nThe thought experiment was proposed by the ancient Greek writer Plutarch in Life of Theseus. It involves a ship that was originally made of wood, but over time, each piece of the ship is replaced with a metal part."
  );
  const [authorName, setAuthorName] = useState("Jon Snow");
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [selectedGradient, setSelectedGradient] = useState(0);
  const [backgroundRoundedness, setBackgroundRoundedness] = useState(18);
  const [cardRoundedness, setCardRoundedness] = useState(12);
  const [currentGradient, setCurrentGradient] = useState(
    "from-orange-200 via-rose-200 to-pink-300"
  );
  const [authorImage, setAuthorImage] = useState<string | null>(null);

  const gradients = [
    "from-orange-200 via-rose-200 to-pink-300",
    "from-green-200 to-green-300",
    "from-rose-200 to-rose-300",
    "from-purple-200 to-purple-300",
    "from-lime-200 to-lime-300",
    "from-orange-200 to-orange-300",
    "from-cyan-200 to-cyan-300",
    "from-red-200 to-red-300",
    "from-emerald-200 to-emerald-300",
    "from-amber-200 to-amber-300",
    "from-violet-200 to-violet-300",
    "from-teal-200 to-teal-300",
    "from-pink-500 to-rose-500",
    "from-cyan-500 to-blue-500",
    "from-violet-600 to-indigo-600",
    "from-emerald-500 to-emerald-900"
  ];

  const handleGradientClick = (gradient: string, index: number) => {
    setSelectedGradient(index);
    setCurrentGradient(gradient);
  };

  const handleDownload = () => {
    const screenshotElement = document.getElementById("downloadImage");
    if (screenshotElement) {
      htmlToImage.toPng(screenshotElement).then(function (dataUrl) {
        download(dataUrl, `pouzz-${new Date()}.png`);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
        {/* Preview */}
        <div className="relative">
          <div
            className={`bg-gradient-to-br ${currentGradient} p-8 py-12 w-full min-h-[400px] flex items-center`}
            style={{
              borderRadius: `${backgroundRoundedness}px`,
            }}
            id="downloadImage"
          >
            <Card
              className="w-full max-w-xl mx-auto bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden"
              style={{
                borderRadius: `${cardRoundedness}px`,
              }}
            >
              <div className="p-6 space-y-4">
                <div className="prose max-w-none">
                  {text.split("\n").map((paragraph, i) => (
                    <p key={i} className="text-gray-800">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <Separator className="w-full text-gray-600 h-[0.08px]" />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {authorImage && (
                      <img
                        src={authorImage}
                        alt="Author"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <span className="text-base">{authorName}</span>
                  </div>
                  {showTimestamp && (
                    <span>{format(new Date(), "MMMM-dd-yyyy HH:mm a")}</span>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6 max-w-lg">
          <div className="space-y-4">
            <Button onClick={handleDownload} className="w-full" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Image
            </Button>
            <div className="space-y-1">
              <Label>Text</Label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[180px]"
              />
            </div>
            <div className="flex gap-2 items-center w-full">
              <div className="space-y-1 flex-1">
                <Label>Author name</Label>
                <Input
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
              </div>

              <div className="space-y-1 flex-1">
                <Label>Author image</Label>
                <Input
                  type="file"
                  className="cursor-pointer"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAuthorImage(reader.result as string); // Set the image state
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={showTimestamp}
                onCheckedChange={setShowTimestamp}
              />
              <Label>Show timestamp</Label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Background style</Label>
              <div className="grid grid-cols-5 gap-2">
                {gradients.map((gradient, index) => (
                  <button
                    key={index}
                    className={`h-12 rounded-lg bg-gradient-to-br ${gradient} ${
                      selectedGradient === index
                        ? "ring-2 ring-offset-2 ring-black"
                        : ""
                    }`}
                    onClick={() => handleGradientClick(gradient, index)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <div className="space-y-2 flex-1">
                <Label>
                  Background roundedness -{" "}
                  <span className="text-sm text-gray-500 w-12 text-right">
                    {backgroundRoundedness}px
                  </span>
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[backgroundRoundedness]}
                    onValueChange={([value]) => setBackgroundRoundedness(value)}
                    max={48}
                    step={1}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <Label>
                  Card roundedness -{" "}
                  <span className="text-sm text-gray-500 w-12 text-right">
                    {cardRoundedness}px
                  </span>
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[cardRoundedness]}
                    onValueChange={([value]) => setCardRoundedness(value)}
                    max={24}
                    step={1}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
