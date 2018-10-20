(function(joint, iphoneSVGString) {

    var graph = new joint.dia.Graph;

    new joint.dia.Paper({
        el: document.getElementById('paper'),
        width: 800,
        height: 600,
        gridSize: 20,
        model: graph,
        defaultConnectionPoint: {
            name: 'boundary',
            args: {
                selector: ['firstChild', 'children', 5]
            }
        }
    });

    var IPhone = joint.dia.Element.define('example.IPhone', {
        position: { x: 100, y: 100 },
        size: { width: 160, height: 335 },
        attrs: { root: { fill: 'black' }}
    }, {
        markup: iphoneSVGString
    });

    var iphone1 = new IPhone();

    var iphone2 = new IPhone();
    iphone2.attr({ root: { fill: 'yellow' }});
    iphone2.translate(300).resize(80, 170).rotate(45);

    var iphone3 = new IPhone();
    iphone3.attr({ root: { fill: 'red' }});
    iphone3.translate(450, 300).resize(40, 85).rotate(90);

    var link = new joint.shapes.standard.DoubleLink({
        source: { id: iphone2.id },
        target: { id: iphone3.id },
        attrs: { line: { stroke: 'red' }}
    });

    graph.addCells([iphone1, iphone2, iphone3, link]);

})(joint, '<g class="scalable">	<g>		<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="113.2705" y1="9.4688" x2="138.583" y2="9.4688">			<stop  offset="0" style="stop-color:#1E1E1F"/>			<stop  offset="0.0125" style="stop-color:#3D3C3E"/>			<stop  offset="0.0362" style="stop-color:#606163"/>			<stop  offset="0.0484" style="stop-color:#717375"/>			<stop  offset="0.0783" style="stop-color:#4E4E50"/>			<stop  offset="0.086" style="stop-color:#434344"/>			<stop  offset="0.9409" style="stop-color:#4F4F51"/>			<stop  offset="0.9416" style="stop-color:#555557"/>			<stop  offset="0.9471" style="stop-color:#737578"/>			<stop  offset="0.9525" style="stop-color:#8A8C8E"/>			<stop  offset="0.9578" style="stop-color:#9A9C9E"/>			<stop  offset="0.9629" style="stop-color:#A4A6A8"/>			<stop  offset="0.9677" style="stop-color:#A7A9AC"/>			<stop  offset="0.9782" style="stop-color:#7C7E80"/>			<stop  offset="0.9881" style="stop-color:#57585A"/>			<stop  offset="0.9957" style="stop-color:#39393A"/>			<stop  offset="1" style="stop-color:#222223"/>		</linearGradient>		<path fill="url(#SVGID_1_)" d="M138.583,11c0,0.55-0.45,1-1,1h-23.313c-0.55,0-1-0.45-1-1V7.938c0-0.55,0.45-1,1-1h23.313			c0.55,0,1,0.45,1,1V11z"/>		<radialGradient id="SVGID_2_" cx="125.125" cy="7.375" r="13.4123" gradientUnits="userSpaceOnUse">			<stop  offset="0" style="stop-color:#A7A9AC"/>			<stop  offset="0.1162" style="stop-color:#A4A6A8"/>			<stop  offset="0.2397" style="stop-color:#9A9C9E"/>			<stop  offset="0.3668" style="stop-color:#8A8C8E"/>			<stop  offset="0.4963" style="stop-color:#737578"/>			<stop  offset="0.6264" style="stop-color:#555557"/>			<stop  offset="0.6452" style="stop-color:#4F4F51"/>			<stop  offset="0.774" style="stop-color:#4D4E50"/>			<stop  offset="0.8204" style="stop-color:#474749"/>			<stop  offset="0.8533" style="stop-color:#383839"/>			<stop  offset="0.871" style="stop-color:#222223"/>			<stop  offset="0.926" style="stop-color:#39393A"/>			<stop  offset="0.9516" style="stop-color:#434344"/>			<stop  offset="0.9616" style="stop-color:#4E4E50"/>			<stop  offset="1" style="stop-color:#717375"/>		</radialGradient>		<path fill="url(#SVGID_2_)" d="M113.383,7.5h25.088c-0.164-0.329-0.497-0.563-0.888-0.563h-23.313			C113.879,6.938,113.547,7.171,113.383,7.5z"/>	</g>	<g>		<linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="9.4585" y1="54.25" x2="9.4585" y2="69.1271">			<stop  offset="0" style="stop-color:#222223"/>			<stop  offset="0.0101" style="stop-color:#39393A"/>			<stop  offset="0.0278" style="stop-color:#57585A"/>			<stop  offset="0.0509" style="stop-color:#7C7E80"/>			<stop  offset="0.0753" style="stop-color:#A7A9AC"/>			<stop  offset="0.1159" style="stop-color:#A4A6A8"/>			<stop  offset="0.1592" style="stop-color:#9A9C9E"/>			<stop  offset="0.2037" style="stop-color:#8A8C8E"/>			<stop  offset="0.249" style="stop-color:#737578"/>			<stop  offset="0.2945" style="stop-color:#555557"/>			<stop  offset="0.3011" style="stop-color:#4F4F51"/>			<stop  offset="0.9086" style="stop-color:#434344"/>			<stop  offset="0.9175" style="stop-color:#4E4E50"/>			<stop  offset="0.9516" style="stop-color:#717375"/>			<stop  offset="0.9638" style="stop-color:#606163"/>			<stop  offset="0.9875" style="stop-color:#3D3C3E"/>			<stop  offset="1" style="stop-color:#1E1E1F"/>		</linearGradient>		<path fill="url(#SVGID_3_)" d="M12.333,67.958c0,0.55-0.45,1-1,1h-3.75c-0.55,0-1-0.45-1-1V55.25c0-0.55,0.45-1,1-1h3.75			c0.55,0,1,0.45,1,1V67.958z"/>		<radialGradient id="SVGID_4_" cx="6.9375" cy="61.8125" r="7.5065" gradientUnits="userSpaceOnUse">			<stop  offset="0" style="stop-color:#A7A9AC"/>			<stop  offset="0.1142" style="stop-color:#A4A6A8"/>			<stop  offset="0.2357" style="stop-color:#9A9C9E"/>			<stop  offset="0.3607" style="stop-color:#8A8C8E"/>			<stop  offset="0.488" style="stop-color:#737578"/>			<stop  offset="0.616" style="stop-color:#555557"/>			<stop  offset="0.6344" style="stop-color:#4F4F51"/>			<stop  offset="0.828" style="stop-color:#222223"/>			<stop  offset="0.883" style="stop-color:#39393A"/>			<stop  offset="0.9086" style="stop-color:#434344"/>			<stop  offset="0.9274" style="stop-color:#4E4E50"/>			<stop  offset="1" style="stop-color:#717375"/>		</radialGradient>		<path fill="url(#SVGID_4_)" d="M7.25,54.318c-0.385,0.139-0.667,0.5-0.667,0.932v12.708c0,0.432,0.281,0.793,0.667,0.932V54.318z"			/>	</g>	<g>		<linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="9.1406" y1="85.5005" x2="9.1406" y2="96.8367">			<stop  offset="0" style="stop-color:#222223"/>			<stop  offset="0.0743" style="stop-color:#272728"/>			<stop  offset="0.101" style="stop-color:#353536"/>			<stop  offset="0.1201" style="stop-color:#464647"/>			<stop  offset="0.1355" style="stop-color:#555658"/>			<stop  offset="0.1487" style="stop-color:#68696B"/>			<stop  offset="0.1604" style="stop-color:#7C7E81"/>			<stop  offset="0.1708" style="stop-color:#949699"/>			<stop  offset="0.1774" style="stop-color:#A7A9AC"/>			<stop  offset="0.1881" style="stop-color:#A4A6A8"/>			<stop  offset="0.1994" style="stop-color:#9A9C9E"/>			<stop  offset="0.211" style="stop-color:#8A8C8E"/>			<stop  offset="0.2229" style="stop-color:#737578"/>			<stop  offset="0.2348" style="stop-color:#555557"/>			<stop  offset="0.2366" style="stop-color:#4F4F51"/>			<stop  offset="0.9086" style="stop-color:#434344"/>			<stop  offset="0.9175" style="stop-color:#4E4E50"/>			<stop  offset="0.9516" style="stop-color:#717375"/>			<stop  offset="0.9638" style="stop-color:#606163"/>			<stop  offset="0.9875" style="stop-color:#3D3C3E"/>			<stop  offset="1" style="stop-color:#1E1E1F"/>		</linearGradient>		<path fill="url(#SVGID_5_)" d="M11.531,95.844c0,0.55-0.45,1-1,1H7.75c-0.55,0-1-0.45-1-1v-9.406c0-0.55,0.45-1,1-1h2.781			c0.55,0,1,0.45,1,1V95.844z"/>		<radialGradient id="SVGID_6_" cx="7.2085" cy="91.2915" r="5.6679" gradientUnits="userSpaceOnUse">			<stop  offset="0" style="stop-color:#A7A9AC"/>			<stop  offset="0.1162" style="stop-color:#A4A6A8"/>			<stop  offset="0.2397" style="stop-color:#9A9C9E"/>			<stop  offset="0.3668" style="stop-color:#8A8C8E"/>			<stop  offset="0.4963" style="stop-color:#737578"/>			<stop  offset="0.6264" style="stop-color:#555557"/>			<stop  offset="0.6452" style="stop-color:#4F4F51"/>			<stop  offset="0.8139" style="stop-color:#4D4E50"/>			<stop  offset="0.8746" style="stop-color:#474749"/>			<stop  offset="0.9178" style="stop-color:#383839"/>			<stop  offset="0.9409" style="stop-color:#222223"/>			<stop  offset="0.9812" style="stop-color:#39393A"/>			<stop  offset="1" style="stop-color:#434344"/>		</radialGradient>		<path fill="url(#SVGID_6_)" d="M7.25,85.592c-0.293,0.175-0.5,0.481-0.5,0.846v9.406c0,0.364,0.207,0.67,0.5,0.846V85.592z"/>	</g>	<g>		<linearGradient id="SVGID_7_" gradientUnits="userSpaceOnUse" x1="9.1406" y1="112.9585" x2="9.1406" y2="124.2947">			<stop  offset="0" style="stop-color:#222223"/>			<stop  offset="0.0743" style="stop-color:#272728"/>			<stop  offset="0.101" style="stop-color:#353536"/>			<stop  offset="0.1201" style="stop-color:#464647"/>			<stop  offset="0.1355" style="stop-color:#555658"/>			<stop  offset="0.1487" style="stop-color:#68696B"/>			<stop  offset="0.1604" style="stop-color:#7C7E81"/>			<stop  offset="0.1708" style="stop-color:#949699"/>			<stop  offset="0.1774" style="stop-color:#A7A9AC"/>			<stop  offset="0.1881" style="stop-color:#A4A6A8"/>			<stop  offset="0.1994" style="stop-color:#9A9C9E"/>			<stop  offset="0.211" style="stop-color:#8A8C8E"/>			<stop  offset="0.2229" style="stop-color:#737578"/>			<stop  offset="0.2348" style="stop-color:#555557"/>			<stop  offset="0.2366" style="stop-color:#4F4F51"/>			<stop  offset="0.9086" style="stop-color:#434344"/>			<stop  offset="0.9175" style="stop-color:#4E4E50"/>			<stop  offset="0.9516" style="stop-color:#717375"/>			<stop  offset="0.9638" style="stop-color:#606163"/>			<stop  offset="0.9875" style="stop-color:#3D3C3E"/>			<stop  offset="1" style="stop-color:#1E1E1F"/>		</linearGradient>		<path fill="url(#SVGID_7_)" d="M11.531,123.302c0,0.55-0.45,1-1,1H7.75c-0.55,0-1-0.45-1-1v-9.406c0-0.55,0.45-1,1-1h2.781			c0.55,0,1,0.45,1,1V123.302z"/>		<radialGradient id="SVGID_8_" cx="7.2085" cy="118.7495" r="5.6679" gradientUnits="userSpaceOnUse">			<stop  offset="0" style="stop-color:#A7A9AC"/>			<stop  offset="0.1162" style="stop-color:#A4A6A8"/>			<stop  offset="0.2397" style="stop-color:#9A9C9E"/>			<stop  offset="0.3668" style="stop-color:#8A8C8E"/>			<stop  offset="0.4963" style="stop-color:#737578"/>			<stop  offset="0.6264" style="stop-color:#555557"/>			<stop  offset="0.6452" style="stop-color:#4F4F51"/>			<stop  offset="0.8139" style="stop-color:#4D4E50"/>			<stop  offset="0.8746" style="stop-color:#474749"/>			<stop  offset="0.9178" style="stop-color:#383839"/>			<stop  offset="0.9409" style="stop-color:#222223"/>			<stop  offset="0.9812" style="stop-color:#39393A"/>			<stop  offset="1" style="stop-color:#434344"/>		</radialGradient>		<path fill="url(#SVGID_8_)" d="M7.25,113.05c-0.293,0.175-0.5,0.481-0.5,0.846v9.406c0,0.364,0.207,0.67,0.5,0.846V113.05z"/>	</g>	<linearGradient id="SVGID_9_" gradientUnits="userSpaceOnUse" x1="86.6211" y1="8.5" x2="86.6211" y2="339.3335">		<stop  offset="0" style="stop-color:#000000"/>		<stop  offset="0.0246" style="stop-color:#414042"/>		<stop  offset="0.0493" style="stop-color:#BDBFC1"/>		<stop  offset="0.0726" style="stop-color:#2E2D2F"/>		<stop  offset="0.8916" style="stop-color:#1E1E1F"/>		<stop  offset="0.901" style="stop-color:#2B2B2C"/>		<stop  offset="0.9127" style="stop-color:#454446"/>		<stop  offset="0.9257" style="stop-color:#5C5C5F"/>		<stop  offset="0.9395" style="stop-color:#787A7C"/>		<stop  offset="0.954" style="stop-color:#9A9C9E"/>		<stop  offset="0.9589" style="stop-color:#A7A9AC"/>		<stop  offset="0.9605" style="stop-color:#939698"/>		<stop  offset="0.9629" style="stop-color:#7C7E80"/>		<stop  offset="0.9656" style="stop-color:#67686B"/>		<stop  offset="0.9686" style="stop-color:#555557"/>		<stop  offset="0.9722" style="stop-color:#454547"/>		<stop  offset="0.9766" style="stop-color:#343435"/>		<stop  offset="0.9828" style="stop-color:#262526"/>		<stop  offset="1" style="stop-color:#212122"/>	</linearGradient>	<path fill="url(#SVGID_9_)" d="M164.867,315.333c0,13.2-10.8,24-24,24H32.375c-13.2,0-24-10.8-24-24V32.5c0-13.2,10.8-24,24-24		h108.492c13.2,0,24,10.8,24,24V315.333z"/>	<path fill="#4F5560" d="M32.375,337.333c-12.131,0-22-9.869-22-22V32.5c0-12.131,9.869-22,22-22h108.492c12.131,0,22,9.869,22,22		v282.833c0,12.131-9.869,22-22,22H32.375z"/>	<path fill="#292B2D" d="M32.375,336.833c-11.855,0-21.5-9.645-21.5-21.5V32.5c0-11.855,9.645-21.5,21.5-21.5h108.492		c11.855,0,21.5,9.645,21.5,21.5v282.833c0,11.855-9.645,21.5-21.5,21.5H32.375z"/>	<path d="M32.375,335.333c-11.028,0-20-8.972-20-20V32.5c0-11.028,8.972-20,20-20h108.492c11.028,0,20,8.972,20,20v282.833		c0,11.028-8.972,20-20,20H32.375z"/>	<g>		<radialGradient id="SVGID_10_" cx="86.583" cy="45.5" r="14.0448" gradientUnits="userSpaceOnUse">			<stop  offset="0" style="stop-color:#4F4F51"/>			<stop  offset="0.2693" style="stop-color:#515153"/>			<stop  offset="0.3663" style="stop-color:#57575A"/>			<stop  offset="0.4355" style="stop-color:#616264"/>			<stop  offset="0.4914" style="stop-color:#6E7072"/>			<stop  offset="0.5393" style="stop-color:#7F8183"/>			<stop  offset="0.5809" style="stop-color:#939597"/>			<stop  offset="0.6129" style="stop-color:#A7A9AC"/>			<stop  offset="0.6871" style="stop-color:#8E9092"/>			<stop  offset="0.8343" style="stop-color:#606163"/>			<stop  offset="0.9428" style="stop-color:#3D3C3E"/>			<stop  offset="1" style="stop-color:#1E1E1F"/>		</radialGradient>		<path fill="url(#SVGID_10_)" d="M101.292,37.417c0,1.818-1.474,3.292-3.292,3.292H75.167c-1.818,0-3.292-1.474-3.292-3.292l0,0			c0-1.818,1.474-3.292,3.292-3.292H98C99.818,34.125,101.292,35.599,101.292,37.417L101.292,37.417z"/>		<g>			<path fill="#0F0F10" d="M99.458,37.208c0,0.897-0.728,1.625-1.625,1.625H75.208c-0.897,0-1.625-0.728-1.625-1.625l0,0				c0-0.897,0.728-1.625,1.625-1.625h22.625C98.731,35.583,99.458,36.311,99.458,37.208L99.458,37.208z"/>			<g>				<linearGradient id="SVGID_11_" gradientUnits="userSpaceOnUse" x1="73.6143" y1="37.2085" x2="99.4448" y2="37.2085">					<stop  offset="0" style="stop-color:#4F4F51"/>					<stop  offset="0.2693" style="stop-color:#515153"/>					<stop  offset="0.3663" style="stop-color:#57575A"/>					<stop  offset="0.4355" style="stop-color:#616264"/>					<stop  offset="0.4914" style="stop-color:#6E7072"/>					<stop  offset="0.5393" style="stop-color:#7F8183"/>					<stop  offset="0.5809" style="stop-color:#939597"/>					<stop  offset="0.6129" style="stop-color:#A7A9AC"/>					<stop  offset="0.6871" style="stop-color:#8E9092"/>					<stop  offset="0.8343" style="stop-color:#606163"/>					<stop  offset="0.9428" style="stop-color:#3D3C3E"/>					<stop  offset="1" style="stop-color:#1E1E1F"/>				</linearGradient>				<path fill="url(#SVGID_11_)" d="M98.787,37.729l0.43-0.43l0.211,0.211c0.008-0.041,0.008-0.085,0.013-0.127l-0.154-0.154					l0.158-0.158c-0.004-0.042-0.006-0.086-0.013-0.127l-0.215,0.215l-0.43-0.43l0.407-0.407c-0.019-0.028-0.04-0.053-0.06-0.081					l-0.417,0.417l-0.43-0.43l0.399-0.399c-0.029-0.018-0.061-0.033-0.091-0.049l-0.378,0.378l-0.43-0.43l0.136-0.136					c-0.03-0.002-0.059-0.009-0.089-0.009h-0.042l-0.075,0.075l-0.075-0.075H97.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146					h-0.141l-0.075,0.075l-0.075-0.075H96.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H95.5					l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H94.5l0.146,0.146l-0.43,0.43l-0.43-0.43					l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H93.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075					l-0.075-0.075H92.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H91.5l0.146,0.146					l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H90.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146					h-0.141l-0.075,0.075l-0.075-0.075H89.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H88.5					l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H87.5l0.146,0.146l-0.43,0.43l-0.43-0.43					l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H86.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075					l-0.075-0.075H85.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H84.5l0.146,0.146					l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H83.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146					h-0.141l-0.075,0.075l-0.075-0.075H82.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H81.5					l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H80.5l0.146,0.146l-0.43,0.43l-0.43-0.43					l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H79.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075					l-0.075-0.075H78.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H77.5l0.146,0.146					l-0.43,0.43l-0.43-0.43l0.146-0.146h-0.141l-0.075,0.075l-0.075-0.075H76.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.146-0.146					h-0.141l-0.075,0.075l-0.075-0.075H75.5l0.146,0.146l-0.43,0.43l-0.43-0.43l0.115-0.115c-0.099,0.019-0.194,0.048-0.286,0.084					l0.03,0.03l-0.43,0.43l-0.125-0.125c-0.024,0.023-0.046,0.047-0.069,0.072l0.124,0.124l-0.43,0.43l-0.023-0.023					c-0.033,0.086-0.061,0.174-0.079,0.266l0.102-0.102l0.43,0.43l-0.43,0.43l-0.089-0.089c0.019,0.084,0.044,0.166,0.076,0.244					l0.014-0.014l0.43,0.43l-0.105,0.105c0.023,0.024,0.048,0.045,0.073,0.068l0.103-0.103l0.428,0.428					c0.066,0.024,0.134,0.047,0.204,0.063l-0.061-0.061l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141					l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43					l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034					l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43					l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034					l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43					l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034					l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43					l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034					l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43					l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034					l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43					l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034					l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43					l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034					l0.034,0.034h0.141l-0.104-0.104l0.43-0.43l0.43,0.43l-0.104,0.104h0.141l0.034-0.034l0.034,0.034h0.083					c0.018,0,0.035-0.005,0.052-0.005l-0.099-0.099l0.43-0.43l0.351,0.351c0.031-0.016,0.062-0.032,0.091-0.049l-0.372-0.372					l0.43-0.43l0.398,0.398c0.02-0.027,0.044-0.05,0.063-0.077L98.787,37.729z M98.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43					L98.646,36.729z M98.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L98.146,37.229z M97.716,35.799l0.43,0.43l-0.43,0.43					l-0.43-0.43L97.716,35.799z M97.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L97.646,36.729z M97.146,37.229l-0.43,0.43					l-0.43-0.43l0.43-0.43L97.146,37.229z M96.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L96.716,35.799z M96.646,36.729					l-0.43,0.43l-0.43-0.43l0.43-0.43L96.646,36.729z M96.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L96.146,37.229z					 M95.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L95.716,35.799z M95.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L95.646,36.729					z M95.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L95.146,37.229z M94.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43					L94.716,35.799z M94.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L94.646,36.729z M94.146,37.229l-0.43,0.43l-0.43-0.43					l0.43-0.43L94.146,37.229z M93.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L93.716,35.799z M93.646,36.729l-0.43,0.43					l-0.43-0.43l0.43-0.43L93.646,36.729z M93.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L93.146,37.229z M92.716,35.799l0.43,0.43					l-0.43,0.43l-0.43-0.43L92.716,35.799z M92.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L92.646,36.729z M92.146,37.229					l-0.43,0.43l-0.43-0.43l0.43-0.43L92.146,37.229z M91.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L91.716,35.799z					 M91.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L91.646,36.729z M91.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L91.146,37.229					z M90.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L90.716,35.799z M90.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43					L90.646,36.729z M90.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L90.146,37.229z M89.716,35.799l0.43,0.43l-0.43,0.43					l-0.43-0.43L89.716,35.799z M89.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L89.646,36.729z M89.146,37.229l-0.43,0.43					l-0.43-0.43l0.43-0.43L89.146,37.229z M88.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L88.716,35.799z M88.646,36.729					l-0.43,0.43l-0.43-0.43l0.43-0.43L88.646,36.729z M88.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L88.146,37.229z					 M87.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L87.716,35.799z M87.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L87.646,36.729					z M87.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L87.146,37.229z M86.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43					L86.716,35.799z M86.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L86.646,36.729z M86.146,37.229l-0.43,0.43l-0.43-0.43					l0.43-0.43L86.146,37.229z M85.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L85.716,35.799z M85.646,36.729l-0.43,0.43					l-0.43-0.43l0.43-0.43L85.646,36.729z M85.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L85.146,37.229z M84.716,35.799l0.43,0.43					l-0.43,0.43l-0.43-0.43L84.716,35.799z M84.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L84.646,36.729z M84.146,37.229					l-0.43,0.43l-0.43-0.43l0.43-0.43L84.146,37.229z M83.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L83.716,35.799z					 M83.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L83.646,36.729z M83.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L83.146,37.229					z M82.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L82.716,35.799z M82.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43					L82.646,36.729z M82.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L82.146,37.229z M81.716,35.799l0.43,0.43l-0.43,0.43					l-0.43-0.43L81.716,35.799z M81.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L81.646,36.729z M81.146,37.229l-0.43,0.43					l-0.43-0.43l0.43-0.43L81.146,37.229z M80.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L80.716,35.799z M80.646,36.729					l-0.43,0.43l-0.43-0.43l0.43-0.43L80.646,36.729z M80.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L80.146,37.229z					 M79.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L79.716,35.799z M79.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L79.646,36.729					z M79.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L79.146,37.229z M78.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43					L78.716,35.799z M78.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L78.646,36.729z M78.146,37.229l-0.43,0.43l-0.43-0.43					l0.43-0.43L78.146,37.229z M77.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L77.716,35.799z M77.646,36.729l-0.43,0.43					l-0.43-0.43l0.43-0.43L77.646,36.729z M77.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L77.146,37.229z M76.716,35.799l0.43,0.43					l-0.43,0.43l-0.43-0.43L76.716,35.799z M76.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L76.646,36.729z M76.146,37.229					l-0.43,0.43l-0.43-0.43l0.43-0.43L76.146,37.229z M75.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L75.716,35.799z					 M75.646,36.729l-0.43,0.43l-0.43-0.43l0.43-0.43L75.646,36.729z M75.146,37.229l-0.43,0.43l-0.43-0.43l0.43-0.43L75.146,37.229					z M74.716,35.799l0.43,0.43l-0.43,0.43l-0.43-0.43L74.716,35.799z M73.787,36.729l0.43-0.43l0.43,0.43l-0.43,0.43L73.787,36.729					z M73.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L73.787,37.729z M74.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L74.716,38.659z					 M74.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L74.787,37.729z M75.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L75.716,38.659z					 M75.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L75.787,37.729z M76.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L76.716,38.659z					 M76.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L76.787,37.729z M77.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L77.716,38.659z					 M77.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L77.787,37.729z M78.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L78.716,38.659z					 M78.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L78.787,37.729z M79.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L79.716,38.659z					 M79.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L79.787,37.729z M80.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L80.716,38.659z					 M80.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L80.787,37.729z M81.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L81.716,38.659z					 M81.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L81.787,37.729z M82.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L82.716,38.659z					 M82.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L82.787,37.729z M83.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L83.716,38.659z					 M83.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L83.787,37.729z M84.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L84.716,38.659z					 M84.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L84.787,37.729z M85.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L85.716,38.659z					 M85.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L85.787,37.729z M86.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L86.716,38.659z					 M86.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L86.787,37.729z M87.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L87.716,38.659z					 M87.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L87.787,37.729z M88.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L88.716,38.659z					 M88.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L88.787,37.729z M89.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L89.716,38.659z					 M89.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L89.787,37.729z M90.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L90.716,38.659z					 M90.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L90.787,37.729z M91.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L91.716,38.659z					 M91.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L91.787,37.729z M92.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L92.716,38.659z					 M92.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L92.787,37.729z M93.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L93.716,38.659z					 M93.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L93.787,37.729z M94.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L94.716,38.659z					 M94.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L94.787,37.729z M95.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L95.716,38.659z					 M95.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L95.787,37.729z M96.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L96.716,38.659z					 M96.787,37.729l0.43-0.43l0.43,0.43l-0.43,0.43L96.787,37.729z M97.716,38.659l-0.43-0.43l0.43-0.43l0.43,0.43L97.716,38.659z					 M98.216,38.159l-0.43-0.43l0.43-0.43l0.43,0.43L98.216,38.159z M98.287,37.229l0.43-0.43l0.43,0.43l-0.43,0.43L98.287,37.229z"					/>				<linearGradient id="SVGID_12_" gradientUnits="userSpaceOnUse" x1="98.9478" y1="36.0625" x2="99.0112" y2="36.0625">					<stop  offset="0" style="stop-color:#4F4F51"/>					<stop  offset="0.2693" style="stop-color:#515153"/>					<stop  offset="0.3663" style="stop-color:#57575A"/>					<stop  offset="0.4355" style="stop-color:#616264"/>					<stop  offset="0.4914" style="stop-color:#6E7072"/>					<stop  offset="0.5393" style="stop-color:#7F8183"/>					<stop  offset="0.5809" style="stop-color:#939597"/>					<stop  offset="0.6129" style="stop-color:#A7A9AC"/>					<stop  offset="0.6871" style="stop-color:#8E9092"/>					<stop  offset="0.8343" style="stop-color:#606163"/>					<stop  offset="0.9428" style="stop-color:#3D3C3E"/>					<stop  offset="1" style="stop-color:#1E1E1F"/>				</linearGradient>				<path fill="url(#SVGID_12_)" d="M98.948,36.031l0.063,0.063C98.991,36.072,98.97,36.051,98.948,36.031z"/>			</g>		</g>	</g>	<g>		<linearGradient id="SVGID_13_" gradientUnits="userSpaceOnUse" x1="83.3931" y1="22.0723" x2="90.0806" y2="27.9473">			<stop  offset="0" style="stop-color:#222223"/>			<stop  offset="0.4812" style="stop-color:#272728"/>			<stop  offset="0.6546" style="stop-color:#353536"/>			<stop  offset="0.7781" style="stop-color:#464647"/>			<stop  offset="0.878" style="stop-color:#555658"/>			<stop  offset="0.9626" style="stop-color:#67696B"/>			<stop  offset="1" style="stop-color:#717375"/>		</linearGradient>		<circle fill="url(#SVGID_13_)" cx="86.583" cy="24.875" r="2.958"/>		<radialGradient id="SVGID_14_" cx="87.146" cy="24.9795" r="2.0836" gradientUnits="userSpaceOnUse">			<stop  offset="0" style="stop-color:#00062F"/>			<stop  offset="0.2232" style="stop-color:#000830"/>			<stop  offset="0.4278" style="stop-color:#000F34"/>			<stop  offset="0.6249" style="stop-color:#00173B"/>			<stop  offset="0.8164" style="stop-color:#012143"/>			<stop  offset="1" style="stop-color:#212D4E"/>		</radialGradient>		<circle fill="url(#SVGID_14_)" cx="86.583" cy="24.875" r="1.302"/>		<radialGradient id="SVGID_15_" cx="86.082" cy="25.3687" r="0.4952" gradientUnits="userSpaceOnUse">			<stop  offset="0" style="stop-color:#39BCED"/>			<stop  offset="0.3637" style="stop-color:#0076A4"/>			<stop  offset="1" style="stop-color:#00062F"/>		</radialGradient>		<circle fill="url(#SVGID_15_)" cx="85.948" cy="25.344" r="0.31"/>		<radialGradient id="SVGID_16_" cx="87.6875" cy="24.3125" r="0.8706" gradientUnits="userSpaceOnUse">			<stop  offset="0" style="stop-color:#39BCED"/>			<stop  offset="0.3637" style="stop-color:#0076A4"/>			<stop  offset="1" style="stop-color:#00062F"/>		</radialGradient>		<circle fill="url(#SVGID_16_)" cx="87.333" cy="24.417" r="0.31"/>		<radialGradient id="SVGID_17_" cx="86.3643" cy="24.3511" r="0.7308" gradientUnits="userSpaceOnUse">			<stop  offset="0" style="stop-color:#24132E"/>			<stop  offset="0.3463" style="stop-color:#261732"/>			<stop  offset="0.6634" style="stop-color:#2E213B"/>			<stop  offset="0.9683" style="stop-color:#3A2F4A"/>			<stop  offset="1" style="stop-color:#3B304C"/>		</radialGradient>		<circle fill="url(#SVGID_17_)" cx="86.167" cy="24.314" r="0.457"/>	</g>	<path fill="#0B0B0C" d="M154.667,292.329c0,1.1-0.9,2-2,2h-132.5c-1.1,0-2-0.9-2-2V56c0-1.1,0.9-2,2-2h132.5c1.1,0,2,0.9,2,2		V292.329z"/>	<rect x="20" y="56.167" fill="#FFFFFF" width="133" height="236.708"/>	<linearGradient id="SVGID_18_" gradientUnits="userSpaceOnUse" x1="117.8623" y1="12.5" x2="117.8623" y2="260.8267">		<stop  offset="0" style="stop-color:#FFFFFF;stop-opacity:0.5"/>		<stop  offset="0.1235" style="stop-color:#FFFFFF;stop-opacity:0.4382"/>		<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/>	</linearGradient>	<path fill="url(#SVGID_18_)" d="M160.867,32.5c0-11.028-8.972-20-20-20h-66.01l7.462,21.625H98c1.818,0,3.292,1.474,3.292,3.292		c0,1.818-1.474,3.292-3.292,3.292H84.592l76.275,221.031V32.5z M86.583,27.833c-1.634,0-2.958-1.325-2.958-2.958		s1.325-2.958,2.958-2.958s2.958,1.325,2.958,2.958S88.217,27.833,86.583,27.833z"/>	<circle cx="85.708" cy="315.125" r="14.708"/>	<radialGradient id="SVGID_19_" cx="85.6255" cy="300.4375" r="18.8754" gradientUnits="userSpaceOnUse">		<stop  offset="0" style="stop-color:#FFFFFF;stop-opacity:0.5"/>		<stop  offset="0.1235" style="stop-color:#FFFFFF;stop-opacity:0.4382"/>		<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/>	</radialGradient>	<path fill="url(#SVGID_19_)" d="M85.708,300.729c8.071,0,14.616,6.501,14.701,14.552c0-0.053,0.008-0.104,0.008-0.156		c0-8.124-6.585-14.708-14.708-14.708S71,307.001,71,315.125c0,0.053,0.007,0.104,0.008,0.156		C71.093,307.23,77.638,300.729,85.708,300.729z"/>	<radialGradient id="SVGID_20_" cx="81.7925" cy="309.8335" r="13.3159" gradientUnits="userSpaceOnUse">		<stop  offset="0" style="stop-color:#ABADB0"/>		<stop  offset="0.1017" style="stop-color:#9FA1A3"/>		<stop  offset="0.2907" style="stop-color:#8D8F91"/>		<stop  offset="0.493" style="stop-color:#808285"/>		<stop  offset="0.7161" style="stop-color:#797B7D"/>		<stop  offset="1" style="stop-color:#77787B"/>	</radialGradient>	<path fill="url(#SVGID_20_)" d="M88.329,320.583h-5.281c-1.654,0-3-1.346-3-3v-5.208c0-1.654,1.346-3,3-3h5.281		c1.654,0,3,1.346,3,3v5.208C91.329,319.238,89.983,320.583,88.329,320.583z M83.048,310.375c-1.103,0-2,0.897-2,2v5.208		c0,1.103,0.897,2,2,2h5.281c1.103,0,2-0.897,2-2v-5.208c0-1.103-0.897-2-2-2H83.048z"/>	<linearGradient id="SVGID_21_" gradientUnits="userSpaceOnUse" x1="85.7085" y1="333.6665" x2="85.7085" y2="298.3193">		<stop  offset="0" style="stop-color:#FFFFFF;stop-opacity:0.5"/>		<stop  offset="0.1235" style="stop-color:#FFFFFF;stop-opacity:0.4382"/>		<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/>	</linearGradient>	<path fill="url(#SVGID_21_)" d="M85.708,316.375c-5.415,0-10.456-0.358-14.694-0.972c0.149,7.994,6.665,14.43,14.694,14.43		s14.545-6.437,14.694-14.43C96.165,316.017,91.124,316.375,85.708,316.375z"/></g>');



