import {
    point
}from "./state.js";

export function calcPoint_tP(han, fu) {
   if(han === 1) {
    if(fu === 30) {
        setPoint(1500,500);
    }
    if(fu === 40) {
        setPoint(2100, 700);
    }
    if(fu === 50) {
        setPoint(2400, 800);
    }
   }

   if(han === 2) {
    if(fu == 20) {
        setPoint(2100, 700);
    }
    
    if(fu === 30) {
        setPoint(3000,1000);
    }
    if(fu === 40) {
        setPoint(3900, 1300);
    }
    if(fu === 50) {
        setPoint(4800, 1600);
    }
   }

   if(han === 3) {
    if(fu === 20) {
        setPoint(3900,1300);
    }
    if(fu === 25) {
        setPoint(4800, 1600);
    }
    if(fu === 30) {
        setPoint(6000,2000);
    }
    if(fu === 40) {
        setPoint(7800, 2600);
    }
    if(fu === 50) {
        setPoint(9600, 3200);
    }
   }

   if(han === 4) {
    if(fu === 20) {
        setPoint(7800,2600);
    }
    if(fu === 25) {
        setPoint(9600, 3200);
    }
   }
   if(han === 5) {
    setPoint(12000, 4000);
   }
   if(han === 6) {
    setPoint(18000, 6000);
   }
   if(han === 7) {
    setPoint(24000, 8000); 
   }
   if(han === 8) {
    setPoint(36000, 12000);
   }
   if(han === 9) {
    setPoint(48000, 16000);
   }

    
}

export function calcPoint_tC(han, fu) {
   if(han === 1) {
    if(fu === 30) {
        setPoint(500,300);
    }
    if(fu === 40) {
        setPoint(700, 400);
    }
    if(fu === 50) {
        setPoint(800, 400);
    }
   }

   if(han === 2) {
    if(fu == 20) {
        setPoint(700, 400);
    }
    
    if(fu === 30) {
        setPoint(1000,500);
    }
    if(fu === 40) {
        setPoint(1300, 700);
    }
    if(fu === 50) {
        setPoint(1600, 800);
    }
   }

   if(han === 3) {
    if(fu === 20) {
        setPoint(1300,700);
    }
    if(fu === 25) {
        setPoint(1600, 800);
    }
    if(fu === 30) {
        setPoint(2000,1000);
    }
    if(fu === 40) {
        setPoint(2600, 1300);
    }
    if(fu === 50) {
        setPoint(3200, 1600);
    }
   }

   if(han === 4) {
    if(fu === 20) {
        setPoint(2600,1300);
    }
    if(fu === 25) {
        setPoint(3200, 1600);
    }
   }
   if(han === 5) {
    setPoint(4000, 2000);
   }
   if(han === 6) {
    setPoint(6000, 3000);
   }
   if(han === 7) {
    setPoint(8000, 4000); 
   }
   if(han === 8) {
    setPoint(12000, 6000);
   }
   if(han === 9) {
    setPoint(16000, 8000);
   }   
}

export function calcPoint_rP(han, fu) {
   if(han === 1) {
    if(fu === 30) {
        setPoint(1500,1500);
    }
    if(fu === 40) {
        setPoint(2000, 2000);
    }
    if(fu === 50) {
        setPoint(2400, 2400);
    }
   }

   if(han === 2) {
    if(fu === 25) {
        setPoint(2400,2400);
    }
    if(fu === 30) {
        setPoint(2900,2900);
    }
    if(fu === 40) {
        setPoint(3900, 3900);
    }
    if(fu === 50) {
        setPoint(4800, 4800);
    }
   }

   if(han === 3) {
    
    if(fu === 25) {
        setPoint(4800, 4800);
    }
    if(fu === 30) {
        setPoint(5800,5800);
    }
    if(fu === 40) {
        setPoint(7700, 7700);
    }
    if(fu === 50) {
        setPoint(9600, 9600);
    }
   }

   if(han === 4) {
    if(fu === 25) {
        setPoint(9600, 9600);
    }
   }
   if(han === 5) {
    setPoint(12000, 12000);
   }
   if(han === 6) {
    setPoint(18000, 18000);
   }
   if(han === 7) {
    setPoint(24000, 24000); 
   }
   if(han === 8) {
    setPoint(36000, 36000);
   }
   if(han === 9) {
    setPoint(48000, 48000);
   }   
}

export function calcPoint_rC(han, fu) {
   if(han === 1) {
    if(fu === 30) {
        setPoint(1000,1000);
    }
    if(fu === 40) {
        setPoint(1300, 1300);
    }
    if(fu === 50) {
        setPoint(1600, 1600);
    }
   }

   if(han === 2) {
    if(fu === 25) {
        setPoint(1600,1600);
    }
    if(fu === 30) {
        setPoint(2000,2000);
    }
    if(fu === 40) {
        setPoint(2600, 2600);
    }
    if(fu === 50) {
        setPoint(3200, 3200);
    }
   }

   if(han === 3) {
    
    if(fu === 25) {
        setPoint(3200, 3200);
    }
    if(fu === 30) {
        setPoint(3900,3900);
    }
    if(fu === 40) {
        setPoint(5200, 5200);
    }
    if(fu === 50) {
        setPoint(6400, 6400);
    }
   }

   if(han === 4) {
    if(fu === 25) {
        setPoint(6400, 6400);
    }
   }
   if(han === 5) {
    setPoint(8000, 8000);
   }
   if(han === 6) {
    setPoint(12000, 12000);
   }
   if(han === 7) {
    setPoint(16000, 16000); 
   }
   if(han === 8) {
    setPoint(24000, 24000);
   }
   if(han === 9) {
    setPoint(32000, 32000);
   }   
}


