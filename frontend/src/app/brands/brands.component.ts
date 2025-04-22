import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})

  export class BrandsComponent {
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
    brandLinks: Record<string, string> = {
      'CHANEL': 'https://www.chanel.com',
      'TOM FORD': 'https://www.tomford.com',
      'SISLEY': 'https://www.sisley-paris.com',
      'ESTÉE LAUDER': 'https://www.esteelauder.com',
      'LANCÔME': 'https://www.lancome.com',
      'AESOP': 'https://www.aesop.com/us/',
      'AIR-VAL':'https://www.air-val.com/',
      'ALEXANDRE J':'https://alexandrej.ru/catalog',
      'ALLIES OF SKIN':'https://eu.allies.shop/',
      'ARMANI':'https://www.armani.com/en-us/',
      'ALIBEKOV':'https://alibekov.kz/',
      'ANGEL SCHLESSER':'https://www.angelschlesser.com/content/16-diseno-a-medida',
      'ANNY':'https://www.anny-cosmetics.com/ru/',
      'ANJA':'https://www.a-cosmetics.net/en',
      'APOLLONIA':'https://www.monamie.kz/brands/apollonia_id433699/ukhod_za_kozhey/',
      'ARMAND BASI':'https://www.armani.com/en-wx/',
      'AVENE':'https://kz.eau-thermale-avene.com/',
      'AXIS-Y':'https://www.axis-y.com/'
  
    };
  
    brandsByLetter: Record<string, string[]> = {
      'A': ['AESOP', 'AIR-VAL', 'ALEXANDRE J', 'ALIBEKOV', 'ALLIES OF SKIN', 'ANGEL SCHLESSER', 'ANNY', 'ANJA', 'APOLLONIA', 'ARMAND BASI', 'ARMANI', 'AVENE', 'AXIS-Y'],
      'B': ['B2V', 'BABOR', 'BANDERAS', 'BAYLIS & HARDING', 'BEAUTY ASSISTANT', 'BEAUTY OF JOSSON', 'BIODERMA', 'BIOLANE', 'BIOREPAIR', 'BIOTHERM', 'BLUMAIRNE', 'BOUCHERON', 'BOURJOIS', 'BOUTICLE', 'BOUTIQUE VEGAN', 'BRITNEY SPEARS', 'BURCHEN'],
      'C': ['C LAB & CO', 'CACHAREL', 'CALVIN KLEIN', 'CARELINE', 'CAROLINA HERPERA', 'CATKIN', 'CELRANKCO', 'CENTEK', 'CERAVE', 'CHLOE', 'CLINIQUE', 'CLIVEN', 'COACH', 'COLLISTAR', 'COMFORT ZONE', 'COS DE BAHA', 'COSRX'],
      'D': ['DASIQUE', 'DAVIDOFF', 'DEWYTREE', 'DIOR', 'DIPTYQUE', 'DKNY', 'DOBRAVA', 'DOLCESGABBANA', 'DR. SPILLER', 'DR.CEURACLE', 'DR.JART+', 'DSQUARED2', 'DUCRAY', 'DUNHILL'],
       'E': ['EASY', 'EDERRALAB', 'ELEMIS', 'ELIE SAAB', 'ELITE MODELS', 'ELIZABETH ARDEN', 'EMANUEL UNGARO', 'ENGELSRUFER', 'ERBORIAN', 'ESCADA', 'ESTÉE LAUDER', 'ESTHETIC HOUSE', 'EVA MOSAIC'],
       'F': ['FEEV', 'FERRAGAMO', 'FILOSOFIE', 'FRANCK OLIVIER', 'FRANCK OLIVIER NICHES', 'FRESH LOOK', 'FRUIT WORKS'],
    'G': ['GA-DE', 'GARNIER', 'GIVENCHY', 'GOLDFIELD&BANKS AUSTRALIA', 'GOSH', 'GRACE COLE', 'GUAM', 'GUCCI', 'GUERLAIN'],
    'H': ['HALLOWEEN', 'HASERVEY', 'HEIMISH', 'HEMPZ', 'HEY BEAUTY', 'HOLIKA HOLIKA', 'HUGO BOSS', 'HUXLEY'],
    'I': ['I LOVE', 'INFLUENCE BEAUTY', 'INGRID COSMETICS', 'INNISFREE', 'IS CLINICAL', 'ISNTREE'],
    'J': ['JAAS', "JACK 'N JILL", 'JANEKE', 'JEAN LOUIS DAVID', 'JEAN PAUL GAULTIER', 'JIMMY CHOO', 'JOHN VARVATOS', 'JULIETTE HAS A GUN', 'JUST'],
    'K': ['KARL LAGERFELD', 'KENZO', 'KERASTASE', 'KEUNE', 'KILIAN PARIS', 'KITFORT'],
    'L': ['L\'ORÉAL PARIS', 'L\'OREAL PROFESSIONNEL', 'LA MER', 'LA ROCHE-POSAY', 'LA SULTANE DE SABA', 'LACOSTE', 'LAGOM', 'LANCASTER', 'LANCÔME', 'LANVIN', 'LAZONAIL', 'LE PETIT OLIVIER', 'LIMONI', 'LION', 'LOEWE', 'LOGIN FOREST', 'LONDA PROFESSIONAL', 'LORVENN', 'LUXVISAGE'],
    'M': ['MA:NYO', 'MAC', 'MAISON MARGIELA', 'MAISON REBATCHI', 'MAKE IT REAL', 'MANCERA', 'MANDARINA DUCK', 'MARC JACOBS', 'MARIE JEANNE', 'MARIO BADESCU', 'MATIERE PREMIERE', 'MATRIX', 'MAX FACTOR', 'MAYBELLINE NEW YORK', 'MEDELA', 'MEDI-PEEL', 'MEIZER', 'MILTON-LLOYD', 'MISSHA', 'MON AMIE', 'MONSIEUR BARBIER', 'MONTALE', 'MONTBLANC', 'MOSCHINO'],
    'N': ['NACIFIC', 'NAILMATIC', 'NARCISO RODRIGUEZ', 'NASOMATTO', 'NEEDLY', 'NESCENS', 'NIGHTOLOGY', 'NINA RICCI', 'NINELLE', 'NIP+FAB', 'NOVEPHA'],
    'O': ['OLIVELLA', 'OLLIN PROFESSIONAL', 'OMNIA BOTANICA', 'ONGREDIENTS', 'ORALSHARK', 'ORIGINS', 'ORTO PARISI', 'OSCAR DE LA RENTA'],
    'P': ['PACOLLECTION', "PALMER'S", 'PARFUM DE VIE', "PAULA'S CHOICE", 'PHILIPS', 'PIERRE GUILLAUME PARIS', 'PRADA', 'PRINCESSE MARINA DE BOURBON', 'PSA', 'PUPA', 'PURE PAW PAW', 'PYUNKANG YUL'],
    'Q': ['QVS'],
    'R': ['RABANNE', 'RATED GREEN', 'RBG (Russian Beauty Guru)', 'REDMOND', 'REMINGTON', 'ROCHAS', 'ROUND LAB', 'ROWENTA'],
    'S': ['SALVADOR DALI', 'SCALPERS', 'SCHAEBENS', 'SEVEN7EEN', 'SHAIK', 'SHAKIRA', 'SHIK', 'SHISEIDO', 'SHU', 'SINSIN', 'SISLEY', 'SKIN1004', 'SKIN79', 'SMASHBOX', 'SNP', 'SOLOMEYA'],
    'T': ['TALBOT RUNHOF', 'TEAOLOGY', 'THE ACT', 'THE BODY SHOP', 'TIGI', 'TOCOBO', 'TOM FORD', 'TOUS', 'TRUSSARDI', 'TRUSSARDI COLLECTION', 'TRUYU', 'TSUBAKI', 'TWEEZERMAN']
    
    };
  
  
    getBrandLink(brand: string): string | null {
      return this.brandLinks[brand] || null;
    }
  }
  

