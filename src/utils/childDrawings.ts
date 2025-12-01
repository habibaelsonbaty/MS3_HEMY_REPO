// Generate simple children's drawings on canvas

export function generateChildDrawing(type: string): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext('2d')!;

  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 600, 600);

  // Set child-like drawing style
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 8;

  switch (type) {
    case 'house':
      // Simple house
      ctx.strokeStyle = '#8B4513';
      ctx.fillStyle = '#FFE4B5';
      ctx.fillRect(150, 250, 300, 250);
      ctx.strokeRect(150, 250, 300, 250);
      
      // Roof
      ctx.fillStyle = '#DC143C';
      ctx.beginPath();
      ctx.moveTo(100, 250);
      ctx.lineTo(300, 100);
      ctx.lineTo(500, 250);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Door
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(250, 350, 100, 150);
      ctx.strokeRect(250, 350, 100, 150);
      
      // Windows
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(180, 300, 80, 80);
      ctx.strokeRect(180, 300, 80, 80);
      ctx.fillRect(340, 300, 80, 80);
      ctx.strokeRect(340, 300, 80, 80);
      break;

    case 'cat':
      // Cat head
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.arc(300, 280, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Ears
      ctx.beginPath();
      ctx.moveTo(220, 220);
      ctx.lineTo(240, 150);
      ctx.lineTo(280, 200);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(380, 220);
      ctx.lineTo(360, 150);
      ctx.lineTo(320, 200);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Eyes
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(260, 270, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(340, 270, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Nose
      ctx.fillStyle = '#FF69B4';
      ctx.beginPath();
      ctx.moveTo(300, 300);
      ctx.lineTo(290, 320);
      ctx.lineTo(310, 320);
      ctx.closePath();
      ctx.fill();
      
      // Whiskers
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(200, 280);
      ctx.lineTo(240, 275);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(200, 300);
      ctx.lineTo(240, 300);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(400, 280);
      ctx.lineTo(360, 275);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(400, 300);
      ctx.lineTo(360, 300);
      ctx.stroke();
      break;

    case 'dog':
      // Dog body
      ctx.fillStyle = '#D2691E';
      ctx.fillRect(200, 300, 200, 150);
      ctx.strokeRect(200, 300, 200, 150);
      
      // Dog head
      ctx.beginPath();
      ctx.arc(300, 230, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Ears
      ctx.fillStyle = '#A0522D';
      ctx.beginPath();
      ctx.ellipse(240, 210, 30, 50, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(360, 210, 30, 50, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Eyes
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(280, 220, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(320, 220, 10, 0, Math.PI * 2);
      ctx.fill();
      
      // Nose
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(300, 250, 12, 0, Math.PI * 2);
      ctx.fill();
      
      // Tail
      ctx.strokeStyle = '#D2691E';
      ctx.lineWidth = 15;
      ctx.beginPath();
      ctx.moveTo(400, 320);
      ctx.quadraticCurveTo(450, 280, 430, 240);
      ctx.stroke();
      break;

    case 'family':
      // Dad
      ctx.fillStyle = '#4169E1';
      ctx.fillRect(80, 200, 80, 150);
      ctx.strokeRect(80, 200, 80, 150);
      ctx.beginPath();
      ctx.arc(120, 160, 40, 0, Math.PI * 2);
      ctx.fillStyle = '#FFDAB9';
      ctx.fill();
      ctx.stroke();
      
      // Mom
      ctx.fillStyle = '#FF69B4';
      ctx.fillRect(200, 220, 80, 130);
      ctx.strokeRect(200, 220, 80, 130);
      ctx.beginPath();
      ctx.arc(240, 180, 40, 0, Math.PI * 2);
      ctx.fillStyle = '#FFDAB9';
      ctx.fill();
      ctx.stroke();
      
      // Child 1
      ctx.fillStyle = '#32CD32';
      ctx.fillRect(320, 260, 60, 90);
      ctx.strokeRect(320, 260, 60, 90);
      ctx.beginPath();
      ctx.arc(350, 230, 30, 0, Math.PI * 2);
      ctx.fillStyle = '#FFDAB9';
      ctx.fill();
      ctx.stroke();
      
      // Child 2
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(420, 270, 60, 80);
      ctx.strokeRect(420, 270, 60, 80);
      ctx.beginPath();
      ctx.arc(450, 240, 28, 0, Math.PI * 2);
      ctx.fillStyle = '#FFDAB9';
      ctx.fill();
      ctx.stroke();
      break;

    case 'tree':
      // Trunk
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(250, 300, 100, 200);
      ctx.strokeRect(250, 300, 100, 200);
      
      // Leaves - 3 circles
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.arc(300, 250, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(230, 280, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(370, 280, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;

    case 'sun':
      // Sun circle
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(300, 250, 100, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Sun rays
      ctx.lineWidth = 10;
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.moveTo(300 + Math.cos(angle) * 120, 250 + Math.sin(angle) * 120);
        ctx.lineTo(300 + Math.cos(angle) * 170, 250 + Math.sin(angle) * 170);
        ctx.stroke();
      }
      
      // Happy face
      ctx.fillStyle = '#FF8C00';
      ctx.beginPath();
      ctx.arc(270, 230, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(330, 230, 12, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#FF8C00';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(300, 260, 40, 0, Math.PI);
      ctx.stroke();
      break;

    case 'flower':
      // Stem
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(300, 500);
      ctx.lineTo(300, 300);
      ctx.stroke();
      
      // Leaves
      ctx.fillStyle = '#32CD32';
      ctx.beginPath();
      ctx.ellipse(260, 400, 40, 20, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(340, 360, 40, 20, 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Flower petals
      ctx.fillStyle = '#FF69B4';
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.arc(300 + Math.cos(angle) * 50, 250 + Math.sin(angle) * 50, 35, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      
      // Center
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(300, 250, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;

    case 'butterfly':
      // Body
      ctx.fillStyle = '#000000';
      ctx.fillRect(285, 200, 30, 200);
      ctx.strokeRect(285, 200, 30, 200);
      
      // Head
      ctx.beginPath();
      ctx.arc(300, 180, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Antennae
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(290, 170);
      ctx.lineTo(270, 140);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(310, 170);
      ctx.lineTo(330, 140);
      ctx.stroke();
      
      // Wings
      ctx.fillStyle = '#FF1493';
      // Top left
      ctx.beginPath();
      ctx.ellipse(200, 230, 80, 60, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Top right
      ctx.beginPath();
      ctx.ellipse(400, 230, 80, 60, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#FF69B4';
      // Bottom left
      ctx.beginPath();
      ctx.ellipse(220, 330, 70, 50, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Bottom right
      ctx.beginPath();
      ctx.ellipse(380, 330, 70, 50, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Wing dots
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(200, 230, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(400, 230, 15, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'car':
      // Body
      ctx.fillStyle = '#FF4500';
      ctx.fillRect(150, 300, 300, 100);
      ctx.strokeRect(150, 300, 300, 100);
      
      // Roof
      ctx.fillRect(220, 230, 160, 70);
      ctx.strokeRect(220, 230, 160, 70);
      
      // Windows
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(230, 240, 70, 50);
      ctx.strokeRect(230, 240, 70, 50);
      ctx.fillRect(310, 240, 60, 50);
      ctx.strokeRect(310, 240, 60, 50);
      
      // Wheels
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(220, 420, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(380, 420, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Wheel centers
      ctx.fillStyle = '#C0C0C0';
      ctx.beginPath();
      ctx.arc(220, 420, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(380, 420, 20, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'bird':
      // Body
      ctx.fillStyle = '#4169E1';
      ctx.beginPath();
      ctx.arc(300, 300, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Head
      ctx.beginPath();
      ctx.arc(350, 250, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Eye
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(360, 245, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(365, 245, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Beak
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.moveTo(390, 250);
      ctx.lineTo(430, 245);
      ctx.lineTo(390, 260);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Wings
      ctx.fillStyle = '#6495ED';
      ctx.beginPath();
      ctx.ellipse(250, 280, 60, 40, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Tail
      ctx.beginPath();
      ctx.moveTo(230, 320);
      ctx.lineTo(150, 300);
      ctx.lineTo(180, 350);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;

    case 'fish':
      // Body
      ctx.fillStyle = '#FF8C00';
      ctx.beginPath();
      ctx.ellipse(300, 300, 120, 70, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Tail
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.moveTo(180, 300);
      ctx.lineTo(100, 250);
      ctx.lineTo(100, 350);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Eye
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(360, 280, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(365, 280, 10, 0, Math.PI * 2);
      ctx.fill();
      
      // Fins
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.moveTo(300, 240);
      ctx.lineTo(280, 190);
      ctx.lineTo(320, 220);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Scales
      ctx.strokeStyle = '#FF6347';
      ctx.lineWidth = 3;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(250 + i * 25, 300, 12, 0, Math.PI);
        ctx.stroke();
      }
      break;

    case 'heart':
      // Big heart
      ctx.fillStyle = '#FF1493';
      ctx.beginPath();
      ctx.moveTo(300, 450);
      ctx.bezierCurveTo(300, 400, 250, 350, 200, 350);
      ctx.bezierCurveTo(150, 350, 150, 400, 150, 400);
      ctx.bezierCurveTo(150, 450, 300, 520, 300, 520);
      ctx.bezierCurveTo(300, 520, 450, 450, 450, 400);
      ctx.bezierCurveTo(450, 400, 450, 350, 400, 350);
      ctx.bezierCurveTo(350, 350, 300, 400, 300, 450);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Small heart
      ctx.fillStyle = '#FF69B4';
      ctx.beginPath();
      ctx.moveTo(300, 200);
      ctx.bezierCurveTo(300, 170, 270, 140, 240, 140);
      ctx.bezierCurveTo(210, 140, 210, 170, 210, 170);
      ctx.bezierCurveTo(210, 200, 300, 250, 300, 250);
      ctx.bezierCurveTo(300, 250, 390, 200, 390, 170);
      ctx.bezierCurveTo(390, 170, 390, 140, 360, 140);
      ctx.bezierCurveTo(330, 140, 300, 170, 300, 200);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;

    case 'balloon':
      // Balloon strings
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(200, 350);
      ctx.quadraticCurveTo(180, 450, 150, 550);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(300, 350);
      ctx.lineTo(300, 550);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(400, 350);
      ctx.quadraticCurveTo(420, 450, 450, 550);
      ctx.stroke();
      
      // Balloons
      ctx.lineWidth = 8;
      
      // Red balloon
      ctx.fillStyle = '#FF0000';
      ctx.beginPath();
      ctx.arc(200, 200, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(200, 270);
      ctx.lineTo(195, 300);
      ctx.lineTo(205, 300);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Yellow balloon
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(300, 170, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(300, 250);
      ctx.lineTo(295, 280);
      ctx.lineTo(305, 280);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Blue balloon
      ctx.fillStyle = '#4169E1';
      ctx.beginPath();
      ctx.arc(400, 210, 75, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(400, 285);
      ctx.lineTo(395, 315);
      ctx.lineTo(405, 315);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;

    default:
      // Default simple smiley
      ctx.beginPath();
      ctx.arc(300, 300, 100, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700';
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(270, 280, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(330, 280, 15, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(300, 320, 50, 0, Math.PI);
      ctx.stroke();
  }

  return canvas.toDataURL('image/png');
}
