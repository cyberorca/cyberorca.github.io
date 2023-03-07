<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google\AdsApi\AdManager\AdManagerSession;
use Google\AdsApi\AdManager\AdManagerSessionBuilder;
use Google\AdsApi\AdManager\v202211\CustomTargetingKey;
use Google\AdsApi\AdManager\v202211\CustomTargetingKeyType;
use Google\AdsApi\AdManager\v202211\CustomTargetingValue;
use Google\AdsApi\AdManager\v202211\CustomTargetingValueMatchType;
use Google\AdsApi\AdManager\Util\v202211\StatementBuilder;
use Google\AdsApi\AdManager\Util\v202211\StatementBuilder as V202211StatementBuilder;
use Google\AdsApi\AdManager\v202211\CustomTargetingValue as V202211CustomTargetingValue;
use Google\AdsApi\AdManager\v202211\CustomTargetingValueMatchType as V202211CustomTargetingValueMatchType;
use Google\AdsApi\AdManager\v202211\ServiceFactory as V202211ServiceFactory;
use Google\AdsApi\AdWords\v201809\cm\OAuthInfo;
use Google\AdsApi\Common\OAuth2TokenBuilder;

class KeyvaluesController extends Controller
{
    private $oAuth2Credential;
    private $session;
    private $serviceFactory;
    private $proceed;

    public function __construct()
    {
       
        $this->oAuth2Credential = (new OAuth2TokenBuilder())
            ->fromFile()
            ->build();

        $this->session = (new AdManagerSessionBuilder())->fromFile()
            ->withOAuth2Credential($this->oAuth2Credential)
            ->build();
        
        $this->serviceFactory = new V202211ServiceFactory();
    }

    public function index()
    {
        $customTargetingService = $this->serviceFactory->createCustomTargetingService($this->session); 
        $statementBuilder = new V202211StatementBuilder();
        $pageSize = $statementBuilder::SUGGESTED_PAGE_LIMIT;
        $statementBuilder = $statementBuilder->where("name LIKE 'hb_pb_%' OR name LIKE 'passback%'")
                ->orderBy('id ASC')
                ->limit($pageSize);
        $page = $customTargetingService->getCustomTargetingKeysByStatement($statementBuilder->toStatement());
        $keyvalues = [];
        if ($page->getResults() !== null) {
            // echo $page->getResults()[0]->getId() . " | " . $page->getResults()[0]->getName() . "<br/>";
            // dd($page->getResults());
            foreach ($page->getResults() as $key => $value) {
                $keyvalues[] = array("id"=>$value->getId(),"name"=> strtoupper(str_replace('hb_pb_','',$value->getName())));
            }
            
        }
        return view('gam.keyvalues.index',['keyval'=>$keyvalues]);
    }

    public function create(Request $request)
    {
        
        $this->proceed = $request->optionsRadios === "true" ? true : false;

        $customTargetingService = $this->serviceFactory->createCustomTargetingService($this->session);   
        
        $keyId = $request->keyvalues_id;

        if($keyId == null){
            return redirect()->route('key-values')->with('status', 'Key is empty');
        }

        $statementBuilder = new V202211StatementBuilder();

            $pageSize = $statementBuilder::SUGGESTED_PAGE_LIMIT;
            $statementBuilder = $statementBuilder->where('id = :id')
                ->orderBy('id ASC')
                ->limit($pageSize)
                ->withBindVariableValue('id', $keyId);
                $page = $customTargetingService->getCustomTargetingKeysByStatement(
                    $statementBuilder->toStatement()
                );
                echo "<pre>";
                print_r($page->getResults());
                echo "</pre>";
                if ($page->getResults() !== null) {
                    echo $page->getResults()[0]->getId() . " | " . $page->getResults()[0]->getName() . "<br/>";
                }
            //$customTargetingValueMatchType = new V202211CustomTargetingValueMatchType();
            //$this->defaultGenerator($customTargetingService, $keyId);
            $this->generateNewDefaultSetting($customTargetingService, $keyId); /** GENERATE KEYVALUES */
            // $this->generate23062021($customTargetingService, $keyId);
            //$this->generatePassback($customTargetingService, $keyId);
    }
    protected function generatePassback($customTargetingService,$keyId){
        $listData = ["tadex_tag-4616435","tadex_tag-4616440","tadex_tag-4616438","tadex_tag-4616433","tadex_tag-4616439","tadex_tag-4616436","tadex_tag-3932133","tadex_tag-3932137","tadex_tag-4434951","tadex_tag-4434952","tadex_tag-3484474","tadex_tag-3484467","tadex_tag-3932146","tadex_tag-3932150","tadex_tag-4434957","tadex_tag-4434958","tadex_tag-3932148","tadex_tag-3932281","tadex_tag-3932120","tadex_tag-3932124","tadex_tag-4434953","tadex_tag-4434954","tadex_tag-3932122","tadex_tag-3932119","tadex_tag-4616446","tadex_tag-4616444","tadex_tag-4616442","tadex_tag-4616445","tadex_tag-4616447","tadex_tag-4616441","tadex_tag-4616423","tadex_tag-4616426","tadex_tag-4616424","tadex_tag-4616429"];
        $getName = [];
        $statementBuilder = new V202211StatementBuilder();
        $statementBuilder = $statementBuilder->where("customTargetingKeyId = :ctid AND name LIKE '%tadex_tag%' ")
                ->orderBy('id ASC')
                ->limit(3000)
                ->withBindVariableValue('ctid', $keyId);
                $page = $customTargetingService->getCustomTargetingValuesByStatement(
                    $statementBuilder->toStatement()
                );
        if ($page->getResults() !== null) {
            // echo "<pre>";
            // print_r($page->getResults());
            // echo "</pre>";
            foreach($page->getResults()  as $x=>$val) {
                $getName[] = $val->getName();
                // if($listData[$i] !== $getName){
                //     echo  $x . " | ". $getName . "<br/>";
                //     // if($this->proceed ){
                //     //     $targetingVal = new V202211CustomTargetingValue();
                //     //     $targetingVal->setCustomTargetingKeyId($keyId);
                //     //     $targetingVal->setDisplayName(strval($getName));
                //     //     $targetingVal->setName(strval($getName));   
                //     //     $targetingVal->setMatchType(V202211CustomTargetingValueMatchType::EXACT);
                //     //     $customTargetingService->createCustomTargetingValues(
                //     //         [
                //     //             $targetingVal
                //     //         ]
                //     //     );
                //     // }
                // }
                
            }
            for($i=0;$i<count($listData);$i++){
                if(!in_array($listData[$i],$getName)){
                    echo  $i . " | ". $listData[$i]. "<br/>";
                    if($this->proceed ){
                        $targetingVal = new V202211CustomTargetingValue();
                        $targetingVal->setCustomTargetingKeyId($keyId);
                        $targetingVal->setDisplayName(strval($listData[$i]));
                        $targetingVal->setName(strval($listData[$i]));   
                        $targetingVal->setMatchType(V202211CustomTargetingValueMatchType::EXACT);
                        $customTargetingService->createCustomTargetingValues(
                            [
                                $targetingVal
                            ]
                        );
                    }
                }
                
            }

            
        }
        // $listData = ["dable_tag-WXpB2J87"];
        //$listData = ["dable_tag-V7a1K9P7","dable_tag-klrv1WJl","dable_tag-2Xn63kEX"];
        // $listData = ["dable_tag-goPLyMro","dable_tag-6XgdqB6o","dable_tag-y74KGWao","dable_tag-37JaMkxo","dable_tag-Gokz2BNX","dable_tag-jobwQqd7","dable_tag-plqNd3EX","dable_tag-QXedMQ6l"];
        // $listData = ["mgid_tag-1330307","mgid_tag-1330304","mgid_tag-1330302","mgid_tag-1330310","mgid_tag-1330309","mgid_tag-1330308","mgid_tag-1330317","mgid_tag-1330314","mgid_tag-1330312","mgid_tag-1330293","mgid_tag-1330296","mgid_tag-1330292"];
        // $listData = ["mgid_tag-1274987","mgid_tag-1273940","mgid_tag-1273939","mgid_tag-1273935","mgid_tag-1273930","mgid_tag-1273927","mgid_tag-1263599","mgid_tag-1274980","mgid_tag-1273799","mgid_tag-1273798","mgid_tag-1273797","mgid_tag-1273796","mgid_tag-1273795","mgid_tag-1147914","mgid_tag-1274984","mgid_tag-1273946","mgid_tag-1273945","mgid_tag-1273944","mgid_tag-1273942","mgid_tag-1273941","mgid_tag-1263063","mgid_tag-1274986","mgid_tag-1274311","mgid_tag-1273921","mgid_tag-1273919","mgid_tag-1273915","mgid_tag-1273913","mgid_tag-1263598","mgid_tag-1147894","mgid_tag-1273761","mgid_tag-1273763","mgid_tag-1273764","mgid_tag-1273765","mgid_tag-1273766","mgid_tag-1274977","mgid_tag-1147933","mgid_tag-1273789","mgid_tag-1273790","mgid_tag-1273791","mgid_tag-1273792","mgid_tag-1273793","mgid_tag-1274983","mgid_tag-1263597","mgid_tag-1273802","mgid_tag-1273803","mgid_tag-1273804","mgid_tag-1273806","mgid_tag-1273807","mgid_tag-1274989","mgid_tag-1263605","mgid_tag-1273918","mgid_tag-1273923","mgid_tag-1273926","mgid_tag-1273931","mgid_tag-1273937","mgid_tag-1274990","mgid_tag-1301959","mgid_tag-1301960","mgid_tag-1311516","mgid_tag-1311513","mgid_tag-1311520","mgid_tag-1311519","mgid_tag-1311525","mgid_tag-1311523","mgid_tag-1311529","mgid_tag-1311528","mgid_tag-1311533","mgid_tag-1311534","mgid_tag-1311543","mgid_tag-1311537","mgid_tag-1311546","mgid_tag-1311545","mgid_tag-1311551","mgid_tag-1311548"];
        // $listData = ["adnuntius_tag-0000000000109450","adnuntius_tag-000000000010944f","adnuntius_tag-000000000010944b","adnuntius_tag-0000000000109407","adnuntius_tag-00000000001093f3","adnuntius_tag-00000000001093fa","adnuntius_tag-0000000000193757","adnuntius_tag-00000000001093b0","adnuntius_tag-00000000001093ab","adnuntius_tag-00000000001093c2","adnuntius_tag-00000000001093ae","adnuntius_tag-0000000000193747","adnuntius_tag-000000000010943e","adnuntius_tag-0000000000109444","adnuntius_tag-000000000010943f","adnuntius_tag-0000000000109440","adnuntius_tag-0000000000193749","adnuntius_tag-00000000001093eb","adnuntius_tag-00000000001093e7","adnuntius_tag-00000000001093e8","adnuntius_tag-0000000000193753","adnuntius_tag-00000000000f8442","adnuntius_tag-00000000000f8445","adnuntius_tag-00000000000f89c8","adnuntius_tag-00000000000f8446","adnuntius_tag-00000000000f8441","adnuntius_tag-00000000000f8444","adnuntius_tag-00000000000f8440","adnuntius_tag-00000000000f843f","adnuntius_tag-00000000000f8443","adnuntius_tag-0000000000193758","adnuntius_tag-00000000001093dc","adnuntius_tag-00000000001093dd","adnuntius_tag-00000000001093d3","adnuntius_tag-00000000001093da","adnuntius_tag-0000000000109429","adnuntius_tag-0000000000109439","adnuntius_tag-000000000010942e","adnuntius_tag-0000000000109433"];
        // for($i=0;$i<count($listData);$i++){
            // echo  $i . " | ". $listData[$i] . " | " . count($listData) . "<br/>";
        //     if($this->proceed ){
        //         $addPrice_rate = new V202211CustomTargetingValue();
        //         $addPrice_rate->setCustomTargetingKeyId($keyId);
        //         $addPrice_rate->setDisplayName(strval($listData[$i]));
        //         $addPrice_rate->setName(strval($listData[$i]));
        //         $addPrice_rate->setMatchType(V202211CustomTargetingValueMatchType::EXACT);
        //         $customTargetingService->createCustomTargetingValues(
        //             [
        //                 $addPrice_rate
        //             ]
        //         );
        //     }
        // }
    }

    protected function generate23062021($customTargetingService,$keyId)
    {
             /* PROCEED PRICE 0.20 x 280*/
            $strPrice_rate_name = "";

            // $price_rate = 1.1;
            // for($i=0;$i<20;$i++){
            //     $strPrice_rate = strval($price_rate);
            //     $dotPos_rate = strpos($strPrice_rate,".");
            //     $price_diff = 0.1;
            //     if(strlen($strPrice_rate) < 4 && strlen($strPrice_rate) > 1){
            //         $strPrice_rate .= "";
            //     }
               
            //     echo $i . " | " . $strPrice_rate . " => " . $dotPos_rate . " => " . strlen($strPrice_rate) . " | ". $strPrice_rate_name ."<br/>";
            //     if($this->proceed ){
            //             $addPrice_rate = new V202211CustomTargetingValue();
            //             $addPrice_rate->setCustomTargetingKeyId($keyId);
            //             $addPrice_rate->setDisplayName(strval($strPrice_rate));
            //             $addPrice_rate->setName(strval($strPrice_rate));
            //             $addPrice_rate->setMatchType(V202211CustomTargetingValueMatchType::PREFIX);
            //             $customTargetingService->createCustomTargetingValues(
            //                 [
            //                     $addPrice_rate
            //                 ]
            //             );
            //     }
            //     $price_rate += $price_diff;
            // }


            $price_rate = 4;
            for($i=0;$i<7;$i++){
                $strPrice_rate = strval($price_rate);
                $dotPos_rate = strpos($strPrice_rate,".");
                $price_diff = 1;
                $strPrice_rate .= ".";
                
                echo $i . " | " . $strPrice_rate . " => " . $dotPos_rate . " => " . strlen($strPrice_rate) . " | ". $strPrice_rate_name ."<br/>";
                if($this->proceed ){
                        $addPrice_rate = new V202211CustomTargetingValue();
                        $addPrice_rate->setCustomTargetingKeyId($keyId);
                        $addPrice_rate->setDisplayName(strval($strPrice_rate));
                        $addPrice_rate->setName(strval($strPrice_rate));
                        $addPrice_rate->setMatchType(V202211CustomTargetingValueMatchType::PREFIX);
                        $customTargetingService->createCustomTargetingValues(
                            [
                                $addPrice_rate
                            ]
                        );
                }
                $price_rate += $price_diff;
            }
    }
    protected function generateNewDefaultSetting($customTargetingService,$keyId)
    {
             /* PROCEED PRICE 0.20 x 280*/
            $strPrice_rate_name = "";

            $price_rate = 0.02;
            for($i=0;$i<126;$i++){
                $strPrice_rate = strval($price_rate);
                $dotPos_rate = strpos($strPrice_rate,".");
                if($i < 98){
                    $price_diff = 0.01;
                    if(strlen($strPrice_rate) < 4 && strlen($strPrice_rate) > 1){
                        $strPrice_rate .= "0";
                    }
                    if($dotPos_rate == ''){
                        $strPrice_rate .= ".00";
                    }
                }
                
                if($i > 97 && $i < 118){
                    $price_diff = 0.10;
                    if(strlen($strPrice_rate) < 4 && strlen($strPrice_rate) > 1){
                        $strPrice_rate .= "0";
                    }
                    if($dotPos_rate == ''){
                        $strPrice_rate .= ".00";
                    }
                }

                if($i > 117 ){
                    $price_diff = 1.0;
                    if($dotPos_rate == ''){
                        $strPrice_rate .= ".0";
                    }
                }

                // else if($i > 117 ){
                //     $price_diff = 1.0;

                //     if($dotPos_rate == ''){
                //         $strPrice_rate .= ".0";
                //     }
                // }else{
                //     $price_diff = 0.01;
                //     if(strlen($strPrice_rate) < 4 && strlen($strPrice_rate) > 1){
                //         $strPrice_rate .= "0";
                //     }
                //     if($dotPos_rate == ''){
                //         $strPrice_rate .= ".00";
                //     }
                // }

                echo $i . " | " . $strPrice_rate . " => " . $dotPos_rate . " => " . strlen($strPrice_rate) . " | ". $strPrice_rate_name ."<br/>";
                if($this->proceed ){
                        $addPrice_rate = new V202211CustomTargetingValue();
                        $addPrice_rate->setCustomTargetingKeyId($keyId);
                        $addPrice_rate->setDisplayName(strval($strPrice_rate));
                        $addPrice_rate->setName(strval($strPrice_rate));
                        $addPrice_rate->setMatchType(V202211CustomTargetingValueMatchType::PREFIX);
                        $customTargetingService->createCustomTargetingValues(
                            [
                                $addPrice_rate
                            ]
                        );
                }
                $price_rate += $price_diff;
            }
    }

    protected function defaultGenerator($customTargetingService,$keyId)
    {
             /* PROCEED PRICE 0.20 x 280*/
            $strPrice_rate_name = "";

            $price_rate = 0.20;
            for($i=0;$i<351;$i++){
                $strPrice_rate = strval($price_rate);
                $dotPos_rate = strpos($strPrice_rate,".");
                if($i > 279 ){
                    $price_diff = 0.1;
                    if(strlen($strPrice_rate) < 4){
                        $strPrice_rate .= "";
                    }
                    if($dotPos_rate == ''){
                        $strPrice_rate .= ".0";
                    }
                }else{
                    $price_diff = 0.01;
                    if(strlen($strPrice_rate) < 4 && strlen($strPrice_rate) > 1){
                        $strPrice_rate .= "0";
                    }
                    if($dotPos_rate == ''){
                        $strPrice_rate .= ".00";
                    }
                }

                echo $i . " | " . $strPrice_rate . " => " . $dotPos_rate . " => " . strlen($strPrice_rate) . " | ". $strPrice_rate_name ."<br/>";
                if($this->proceed ){
                        $addPrice_rate = new V202211CustomTargetingValue();
                        $addPrice_rate->setCustomTargetingKeyId($keyId);
                        $addPrice_rate->setDisplayName(strval($strPrice_rate));
                        $addPrice_rate->setName(strval($strPrice_rate));
                        $addPrice_rate->setMatchType(V202211CustomTargetingValueMatchType::PREFIX);
                        $customTargetingService->createCustomTargetingValues(
                            [
                                $addPrice_rate
                            ]
                        );
                }
                $price_rate += $price_diff;
            }
        }
        

        protected function getCusomGenerator(){
        // $customTargetingService = $this->serviceFactory->createCustomTargetingService($this->session);   
        
        // $keyId = $request->keyvalues_id; //["12578120"];//["12172896","12175959","12159029","12159032","12175962","12159035","12175965","12159038","12159041"];

        // if($keyId == null){
        //     return redirect()->route('key-values')->with('status', 'Key is empty');;
        // }

        // $statementBuilder = new V202211StatementBuilder();

        //     $pageSize = $statementBuilder::SUGGESTED_PAGE_LIMIT;
        //     $statementBuilder = $statementBuilder->where('id = :id')
        //         ->orderBy('id ASC')
        //         ->limit($pageSize)
        //         ->withBindVariableValue('id', $keyId);
        //         $page = $customTargetingService->getCustomTargetingKeysByStatement(
        //             $statementBuilder->toStatement()
        //         );
        //         if ($page->getResults() !== null) {
        //             echo $page->getResults()[0]->getId() . " | " . $page->getResults()[0]->getName() . "<br/>";
        //         }
        //     $customTargetingValueMatchType = new V202211CustomTargetingValueMatchType();

        //     echo "<br> <h1><strong>{$keyId}</strong></h1> <br>";
        //     $price_001 = 0.20;
        //     for($i=0;$i<280;$i++){
        //         $strPrice_001 = strval($price_001);
        //         $dotPos_001 = strpos($strPrice_001,".");
        //         $strlen_001 = strlen($strPrice_001);
        //         if($dotPos_001 == ''){
        //             $strPrice_001 .= ".00";
        //         }
        //         if(strlen($strPrice_001) < 4){
        //             $strPrice_001 .= "0";
        //         }
        //         echo $strPrice_001 . " => " . $dotPos_001 . " => " . strlen($strPrice_001) ."<br/>";
        //         if($this->proceed){
        //                 $addPrice_001 = new V202211CustomTargetingValue();
        //                 $addPrice_001->setCustomTargetingKeyId($keyId);
        //                 $addPrice_001->setDisplayName($strPrice_001);
        //                 $addPrice_001->setName($strPrice_001);
        //                 $addPrice_001->setMatchType($customTargetingValueMatchType::EXACT);
        //                 $customTargetingService->createCustomTargetingValues(
        //                     [
        //                         $addPrice_001
        //                     ]
        //                 );
        //         }
        //         $price_001 += 0.01;
        //     }
           
        //     echo "<br> ================ <br>";
        //     $price_005 = 3.00;
        //     for($i=0;$i<60;$i++){
        //         $strPrice_005 = strval($price_005);
        //         $dotPos_005 = strpos($strPrice_005,".");
        //         $strlen_005 = strlen($strPrice_005);

        //         if($dotPos_005 == ''){
        //             $strPrice_005 .= ".00";
        //         }
        //         if(strlen($strPrice_005) < 4){
        //             $strPrice_005 .= "0";
        //         }

        //         echo  $strPrice_005 . " => " . $dotPos_005 . " => " . strlen($strPrice_005) ."<br/>"; 
        //         if($this->proceed){
        //                 $addPrice_005 = new V202211CustomTargetingValue();
        //                 $addPrice_005->setCustomTargetingKeyId($keyId);
        //                 $addPrice_005->setDisplayName($strPrice_005);
        //                 $addPrice_005->setName($strPrice_005);
        //                 $addPrice_005->setMatchType($customTargetingValueMatchType::EXACT);
        //                 $customTargetingService->createCustomTargetingValues(
        //                     [
        //                         $addPrice_005
        //                     ]
        //                 );
        //         }
        //         $price_005 += 0.05;
        //     }
        //     echo "<br> ================ <br>";
        //     $price_050 = 6.00;
        //     for($i=0;$i<29;$i++){
        //         $strPrice_050 = strval($price_050);
        //         $dotPos_050 = strpos($strPrice_050,".");
        //         $strlen_050 = strlen($strPrice_050);
                
        //         if($dotPos_050 == ''){
        //             $strPrice_050 .= ".00";
        //         }
                
        //         if($dotPos_050 == 2 && $strlen_050 < 5){
        //             $strPrice_050 .= "0";
        //         }

        //         if(strlen($strPrice_050) < 4){
        //             $strPrice_050 .= "0";
        //         }

        //         echo  $strPrice_050 . " => " . $dotPos_050 . " => " . strlen($strPrice_050) . "<br/>"; 
        //         if($this->proceed){
        //                 $addPrice_050 = new V202211CustomTargetingValue();
        //                 $addPrice_050->setCustomTargetingKeyId($keyId);
        //                 $addPrice_050->setDisplayName($strPrice_050);
        //                 $addPrice_050->setName($strPrice_050);
        //                 $addPrice_050->setMatchType($customTargetingValueMatchType::EXACT);
        //                 $customTargetingService->createCustomTargetingValues(
        //                     [
        //                         $addPrice_050
        //                     ]
        //                 );
        //         }

        //         $price_050 += 0.50;
        //     }
    
    }
}